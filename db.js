const path = require('node:path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'attendance.db');

let dbInstance = null;

function getDb() {
  if (!dbInstance) {
    dbInstance = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Failed to connect to SQLite database:', err.message);
      } else {
        console.log(`Connected to SQLite database at ${DB_PATH}`);
      }
    });
    initSchema(dbInstance);
  }
  return dbInstance;
}

function initSchema(db) {
  db.serialize(() => {
    // Workers table
    db.run(`
      CREATE TABLE IF NOT EXISTS workers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT DEFAULT '',
        token TEXT UNIQUE NOT NULL,
        created_at INTEGER NOT NULL
      )
    `);

    // Attendance events table
    db.run(`
      CREATE TABLE IF NOT EXISTS attendance_events (
        id TEXT PRIMARY KEY,
        worker_id TEXT NOT NULL,
        day TEXT NOT NULL,
        kind TEXT NOT NULL,
        time INTEGER NOT NULL,
        latitude REAL,
        longitude REAL,
        accuracy REAL,
        distance_meters REAL,
        status TEXT NOT NULL,
        ip TEXT,
        user_agent TEXT,
        FOREIGN KEY (worker_id) REFERENCES workers(id)
      )
    `);

    // Used challenges to prevent replay attacks
    db.run(`
      CREATE TABLE IF NOT EXISTS used_challenges (
        nonce TEXT PRIMARY KEY,
        worker_id TEXT NOT NULL,
        scanned_at INTEGER NOT NULL
      )
    `);

    // System settings table
    db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    // Create index on attendance day & worker_id for fast queries
    db.run(`CREATE INDEX IF NOT EXISTS idx_events_worker_day ON attendance_events (worker_id, day)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_events_time ON attendance_events (time DESC)`);
  });
}

// Database helper promises
function run(sql, params = []) {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  getDb,
  run,
  get,
  all
};

