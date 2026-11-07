CREATE TABLE IF NOT EXISTS workers (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  worker_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  FOREIGN KEY(worker_id) REFERENCES workers(id) ON DELETE CASCADE
);
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
  FOREIGN KEY(worker_id) REFERENCES workers(id)
);
CREATE INDEX IF NOT EXISTS idx_events_worker_day ON attendance_events(worker_id, day);
CREATE INDEX IF NOT EXISTS idx_events_time ON attendance_events(time DESC);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
