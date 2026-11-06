const http = require('node:http');
const path = require('node:path');

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

  // 4. Get Live Signed Office QR
  console.log('\n4. Testing GET /api/office/qr...');
  const qrRes = await request({ host: 'localhost', port: 3000, path: '/api/office/qr', method: 'GET' });
  console.log('Office QR:', qrRes.data);
  const scannedQrCode = qrRes.data.code;
  if (!scannedQrCode.startsWith('DAYMARK|V2|')) throw new Error('Invalid QR payload format');

  // 5. Submit Scan (Check-in)
  console.log('\n5. Testing POST /api/attendance/scan (Arrival Check-in)...');
  const scan1 = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/attendance/scan',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    token: workerToken,
    qrCode: scannedQrCode,
    location: { latitude: 12.9716, longitude: 77.5946, accuracy: 10 }
  });
  console.log('Scan 1 result:', scan1.data);
  if (!scan1.data.success || scan1.data.kind !== 'in') throw new Error('Scan 1 check-in failed');

  // 6. Test Anti-Replay: same QR scan again
  console.log('\n6. Testing Anti-Replay: scanning used QR challenge again...');
  const replay = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/attendance/scan',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    token: workerToken,
    qrCode: scannedQrCode,
    location: { latitude: 12.9716, longitude: 77.5946, accuracy: 10 }
  });
  console.log('Replay status:', replay.status, replay.data);
  if (replay.status !== 400 || !replay.data.error.includes('already scanned')) {
    throw new Error('Anti-replay test failed: expected 400 with replay error');
  }
  console.log('Anti-replay blocked successfully! (Expected behavior)');

  // 7. Check Dashboard sync
  console.log('\n7. Testing GET /api/dashboard...');
  const dash = await request({ host: 'localhost', port: 3000, path: '/api/dashboard', method: 'GET' });
  console.log('Dashboard stats:', dash.data.stats);
  console.log('Recent scans count:', dash.data.recent.length);
  if (dash.data.stats.checkedIn < 1) throw new Error('Dashboard stats did not update');

  console.log('\n>>> ALL 4 REQUIREMENTS VERIFIED AND WORKING PROPERLY. <<<');
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

