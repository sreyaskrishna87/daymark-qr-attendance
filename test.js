const http = require('node:http');

// Helper to make HTTP requests
function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting Daymark QR Attendance Server Integration Test ---');
  
  // 1. Health check
  console.log('1. Testing /api/health...');
  const health = await request({ host: 'localhost', port: 3000, path: '/api/health', method: 'GET' });
  console.log('Health response:', health.data);
  if (health.data.status !== 'ok') throw new Error('Health check failed');

  // 2. Add Worker
  console.log('\n2. Testing POST /api/workers...');
  const newWorker = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/workers',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'Priya Sharma', role: 'Operations Lead' });
  console.log('Created worker:', newWorker.data);
  const { id: workerId, token: workerToken } = newWorker.data;
  if (!workerToken) throw new Error('Worker token missing');

  // 3. Worker Profile via token
  console.log('\n3. Testing GET /api/worker/me?token=...');
  const me = await request({
    host: 'localhost',
    port: 3000,
    path: `/api/worker/me?token=${workerToken}`,
    method: 'GET'
  });
  console.log('Worker profile:', me.data);
  if (me.data.worker.name !== 'Priya Sharma') throw new Error('Worker profile mismatch');

  // 4. Test Fixed Printed Poster QR
  console.log('\n4. Testing GET /api/office/static-qr (Fixed Printable Poster)...');
  const staticQrRes = await request({ host: 'localhost', port: 3000, path: '/api/office/static-qr', method: 'GET' });
  console.log('Static Poster QR:', staticQrRes.data);
  const posterCode = staticQrRes.data.code;
  if (!posterCode.startsWith('DAYMARK|STATIC|')) throw new Error('Invalid Static QR format');

  // Configure Office Location (Bangalore HQ: 12.9716, 77.5946, 150m radius)
  console.log('\n4b. Setting Office Geofence Coordinates in /api/settings...');
  await request({
    host: 'localhost',
    port: 3000,
    path: '/api/settings',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    officeName: 'Bangalore HQ Entrance',
    officeLat: 12.9716,
    officeLng: 77.5946,
    geofenceRadius: 150,
    strictGps: true,
    qrMode: 'fixed'
  });

  // 5. Submit Scan on Static Printed Poster (Within Geofence: 15m away)
  console.log('\n5. Testing scan on fixed poster WITHIN geofence...');
  const scanPosterGood = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/attendance/scan',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    token: workerToken,
    qrCode: posterCode,
    location: { latitude: 12.9717, longitude: 77.5947, accuracy: 15 } // ~15m from office
  });
  console.log('Scan good result:', scanPosterGood.data);
  if (!scanPosterGood.data.success || scanPosterGood.data.kind !== 'in') throw new Error('Poster check-in failed');

  // 6. Test Worker 2 scanning from home (5 km away) -> MUST BE REJECTED
  console.log('\n6. Testing Worker 2 scanning fixed poster FROM HOME (5 km away)...');
  const worker2 = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/workers',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'Rahul Verma', role: 'Support' });
  const worker2Token = worker2.data.token;

  const scanPosterFar = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/attendance/scan',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    token: worker2Token,
    qrCode: posterCode,
    location: { latitude: 13.0300, longitude: 77.6200, accuracy: 20 } // ~7 km away
  });
  console.log('Remote scan result (status):', scanPosterFar.status, scanPosterFar.data);
  if (scanPosterFar.status !== 400 || !scanPosterFar.data.error.includes('Location check failed')) {
    throw new Error('Expected remote scan to be rejected by geofence!');
  }
  console.log('Remote scan blocked by GPS geofence successfully! (Expected behavior)');

  // 7. Check Dashboard sync
  console.log('\n7. Testing GET /api/dashboard...');
  const dash = await request({ host: 'localhost', port: 3000, path: '/api/dashboard', method: 'GET' });
  console.log('Dashboard stats:', dash.data.stats);
  console.log('Recent scans count:', dash.data.recent.length);
  if (dash.data.stats.checkedIn < 1) throw new Error('Dashboard stats did not update');

  console.log('\n>>> ALL REQUIREMENTS (FIXED PRINTABLE QR + GEOFENCE SECURITY) VERIFIED! <<<');
}

// Start server if needed or test running server
async function main() {
  try {
    await request({ host: 'localhost', port: 3000, path: '/api/health', method: 'GET' });
    await runTests();
  } catch (err) {
    console.log('Starting internal server for test...');
    require('./server.js');
    await new Promise(r => setTimeout(r, 1200));
    await runTests();
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
