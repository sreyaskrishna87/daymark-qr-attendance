require('dotenv').config();
const path = require('node:path');
const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'daymark-secret-attendance-key-2026';
const OFFICE_ID = process.env.OFFICE_ID || 'OFFICE-A';
const QR_INTERVAL_SEC = parseInt(process.env.QR_INTERVAL_SEC, 10) || 25;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper: current day string (YYYY-MM-DD in local time)
function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Helper: Haversine distance in meters
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // meters
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Generate signed rotating QR challenge
function generateOfficeQR() {
  const now = Date.now();
  const bucket = Math.floor(now / (QR_INTERVAL_SEC * 1000));
  const expiresAt = (bucket + 1) * (QR_INTERVAL_SEC * 1000);
  const remainingSeconds = Math.max(1, Math.ceil((expiresAt - now) / 1000));
  const nonce = crypto.randomBytes(8).toString('hex');
  const payload = `DAYMARK|V2|${OFFICE_ID}|${bucket}|${expiresAt}|${nonce}`;
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex').slice(0, 16);
  const code = `${payload}|${signature}`;

  return {
    code,
    officeId: OFFICE_ID,
    bucket,
    expiresAt,
    remainingSeconds,
    intervalSeconds: QR_INTERVAL_SEC
  };
}

// Prune old used challenges periodically (older than 15 minutes)
setInterval(async () => {
  try {
    const cutoff = Date.now() - 15 * 60 * 1000;
    await db.run('DELETE FROM used_challenges WHERE scanned_at < ?', [cutoff]);
  } catch (err) {
    console.error('Error pruning used challenges:', err.message);
  }
}, 5 * 60 * 1000);

// --- API Endpoints ---

// 1. Health check & status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mode: 'backend-connected',
    officeId: OFFICE_ID,
    timestamp: Date.now()
  });
});

// 2. Office Settings (Get & Update)
app.get('/api/settings', async (req, res) => {
  try {
    const rows = await db.all('SELECT key, value FROM settings');
    const settings = {
      officeName: 'Main Office',
      officeLat: null,
      officeLng: null,
      geofenceRadius: 150,
      strictGps: false
    };
    for (const r of rows) {
      if (r.key === 'officeName') settings.officeName = r.value;
      if (r.key === 'officeLat') settings.officeLat = r.value ? parseFloat(r.value) : null;
      if (r.key === 'officeLng') settings.officeLng = r.value ? parseFloat(r.value) : null;
      if (r.key === 'geofenceRadius') settings.geofenceRadius = parseInt(r.value, 10) || 150;
      if (r.key === 'strictGps') settings.strictGps = r.value === '1';
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const { officeName, officeLat, officeLng, geofenceRadius, strictGps } = req.body;
    if (officeName !== undefined) {
      await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['officeName', String(officeName)]);
    }
    if (officeLat !== undefined) {
      await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['officeLat', officeLat === null ? '' : String(officeLat)]);
    }
    if (officeLng !== undefined) {
      await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['officeLng', officeLng === null ? '' : String(officeLng)]);
    }
    if (geofenceRadius !== undefined) {
      await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['geofenceRadius', String(geofenceRadius)]);
    }
    if (strictGps !== undefined) {
      await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['strictGps', strictGps ? '1' : '0']);
    }
    res.json({ success: true, message: 'Settings saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Office QR code endpoint
app.get('/api/office/qr', (req, res) => {
  res.json(generateOfficeQR());
});

// 4. Central Dashboard Data
app.get('/api/dashboard', async (req, res) => {
  try {
    const today = getTodayString();
    const workers = await db.all('SELECT id, name, role, token, created_at FROM workers ORDER BY created_at ASC');
    const todayEvents = await db.all(
      'SELECT worker_id, kind, time FROM attendance_events WHERE day = ? ORDER BY time ASC',
      [today]
    );

    // Map each worker to their latest state today
    const stateByWorker = {};
    for (const e of todayEvents) {
      stateByWorker[e.worker_id] = { kind: e.kind, time: e.time };
    }

    let checkedIn = 0;
    let checkedOut = 0;

    const roster = workers.map((w) => {
      const stateInfo = stateByWorker[w.id];
      const state = stateInfo ? stateInfo.kind : 'none';
      if (state === 'in') checkedIn++;
      if (state === 'out') checkedOut++;
      return {
        id: w.id,
        name: w.name,
        role: w.role,
        token: w.token,
        state,
        lastScanTime: stateInfo ? stateInfo.time : null
      };
    });

    // Recent 20 events with worker name
    const recent = await db.all(`
      SELECT e.id, e.worker_id, e.kind, e.time, e.distance_meters, e.status, w.name as worker_name, w.role as worker_role
      FROM attendance_events e
      LEFT JOIN workers w ON e.worker_id = w.id
      ORDER BY e.time DESC
      LIMIT 20
    `);

    res.json({
      today,
      stats: {
        checkedIn,
        checkedOut,
        totalWorkers: workers.length
      },
      workers: roster,
      recent
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Worker Management
app.post('/api/workers', async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Worker name is required' });
    }
    const id = crypto.randomUUID();
    const token = crypto.randomBytes(20).toString('hex');
    const created_at = Date.now();

    await db.run(
      'INSERT INTO workers (id, name, role, token, created_at) VALUES (?, ?, ?, ?, ?)',
      [id, name.trim(), (role || '').trim(), token, created_at]
    );

    res.status(201).json({
      id,
      name: name.trim(),
      role: (role || '').trim(),
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/workers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM workers WHERE id = ?', [id]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Worker Authenticated Session
app.get('/api/worker/me', async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(401).json({ error: 'Authentication token is required' });
    }

    const worker = await db.get('SELECT id, name, role, token FROM workers WHERE token = ?', [token]);
    if (!worker) {
      return res.status(403).json({ error: 'Invalid or expired worker personal link' });
    }

    const today = getTodayString();
    const todayEvents = await db.all(
      'SELECT id, kind, time, distance_meters, status FROM attendance_events WHERE worker_id = ? AND day = ? ORDER BY time ASC',
      [worker.id, today]
    );

    const lastEvent = todayEvents.length > 0 ? todayEvents[todayEvents.length - 1] : null;

    res.json({
      worker: {
        id: worker.id,
        name: worker.name,
        role: worker.role
      },
      currentState: lastEvent ? lastEvent.kind : 'none',
      lastEvent,
      todayEvents
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Process Central Attendance Scan with Anti-Fraud Checks
app.post('/api/attendance/scan', async (req, res) => {
  try {
    const { token, qrCode, location } = req.body;

    // A. Authenticate Worker
    if (!token) {
      return res.status(401).json({ error: 'Missing worker authentication token' });
    }
    const worker = await db.get('SELECT id, name, role FROM workers WHERE token = ?', [token]);
    if (!worker) {
      return res.status(403).json({ error: 'Unauthorized: Invalid worker link' });
    }

    // B. Validate QR Challenge Format
    if (!qrCode || typeof qrCode !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid QR code content' });
    }

    const parts = qrCode.split('|');
    // Format: DAYMARK|V2|officeId|bucket|expiresAt|nonce|signature
    if (parts.length !== 7 || parts[0] !== 'DAYMARK' || parts[1] !== 'V2') {
      return res.status(400).json({
        error: 'Unrecognized QR code. Please scan the official Daymark office QR screen.'
      });
    }

    const [header, version, scannedOfficeId, bucket, expiresAtStr, nonce, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    const now = Date.now();

    // C. Cryptographic Signature Verification
    const expectedPayload = `DAYMARK|V2|${scannedOfficeId}|${bucket}|${expiresAt}|${nonce}`;
    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(expectedPayload).digest('hex').slice(0, 16);

    if (signature !== expectedSignature) {
      return res.status(400).json({
        error: 'Security alert: QR signature check failed. Forged or corrupted QR code.'
      });
    }

    // D. Expiration Check (25s window + 6s clock drift grace)
    if (now > expiresAt + 6000) {
      return res.status(400).json({
        error: 'This QR code has expired. Please scan the current rotating code on the office screen.'
      });
    }

    // E. Anti-Replay: Check if Nonce was already used
    const existingUse = await db.get('SELECT nonce, worker_id, scanned_at FROM used_challenges WHERE nonce = ?', [nonce]);
    if (existingUse) {
      return res.status(400).json({
        error: 'Security alert: This QR challenge was already scanned. Replay scans are blocked. Please scan the fresh rotating code.'
      });
    }

    // Record nonce immediately to prevent concurrency replay
    await db.run('INSERT INTO used_challenges (nonce, worker_id, scanned_at) VALUES (?, ?, ?)', [nonce, worker.id, now]);

    // F. Geofence & Proximity Verification
    const settingsRows = await db.all('SELECT key, value FROM settings');
    const settings = {};
    for (const r of settingsRows) settings[r.key] = r.value;

    const officeLat = settings.officeLat ? parseFloat(settings.officeLat) : null;
    const officeLng = settings.officeLng ? parseFloat(settings.officeLng) : null;
    const radius = settings.geofenceRadius ? parseInt(settings.geofenceRadius, 10) : 150;
    const strictGps = settings.strictGps === '1';

    let distanceMeters = null;
    let scanStatus = 'verified';

    if (officeLat !== null && officeLng !== null) {
      if (location && typeof location.latitude === 'number' && typeof location.longitude === 'number') {
        distanceMeters = Math.round(haversineDistance(officeLat, officeLng, location.latitude, location.longitude));
        const accuracy = location.accuracy || 20;

        if (distanceMeters > radius + accuracy) {
          if (strictGps) {
            return res.status(400).json({
              error: `Location check failed: You are approximately ${distanceMeters}m away from the office (allowed: ${radius}m). Physical presence is required.`
            });
          } else {
            scanStatus = 'flagged_distance';
          }
        }
      } else {
        if (strictGps) {
          return res.status(400).json({
            error: 'Office requires location permission to verify physical presence. Please allow GPS and try again.'
          });
        }
        scanStatus = 'location_omitted';
      }
    }

    // G. Determine In / Out State
    const today = getTodayString();
    const lastEvent = await db.get(
      'SELECT kind FROM attendance_events WHERE worker_id = ? AND day = ? ORDER BY time DESC LIMIT 1',
      [worker.id, today]
    );

    const kind = lastEvent && lastEvent.kind === 'in' ? 'out' : 'in';

    // H. Insert Attendance Event
    const eventId = crypto.randomUUID();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    await db.run(`
      INSERT INTO attendance_events (id, worker_id, day, kind, time, latitude, longitude, accuracy, distance_meters, status, ip, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      eventId,
      worker.id,
      today,
      kind,
      now,
      location?.latitude || null,
      location?.longitude || null,
      location?.accuracy || null,
      distanceMeters,
      scanStatus,
      ip,
      userAgent
    ]);

    res.json({
      success: true,
      kind,
      time: now,
      worker: {
        id: worker.id,
        name: worker.name
      },
      distanceMeters,
      status: scanStatus,
      message: kind === 'in' ? 'Check-in recorded! Welcome to the office.' : 'Check-out recorded! Have a great evening.'
    });
  } catch (err) {
    console.error('Scan processing error:', err);
    res.status(500).json({ error: 'Server error processing scan: ' + err.message });
  }
});

// Serve static frontend files from current directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname));

// Dedicated full-screen kiosk view route
app.get('/kiosk', (req, res) => {
  res.sendFile(path.join(__dirname, 'kiosk.html'));
});

// Catch-all route to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`  DAYMARK QR ATTENDANCE SERVER RUNNING`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Office Kiosk Display: http://localhost:${PORT}/kiosk`);
  console.log(`  Office ID: ${OFFICE_ID} | Rotation: ${QR_INTERVAL_SEC}s`);
  console.log(`====================================================`);
});
