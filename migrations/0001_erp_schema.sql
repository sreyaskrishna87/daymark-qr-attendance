-- DoIt Innovations ERP & HRMS Database Schema
CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,
  emp_code TEXT UNIQUE,
  username TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Team Member',
  department TEXT NOT NULL DEFAULT 'General',
  joining_date TEXT,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attendance_events (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  day TEXT NOT NULL,
  kind TEXT NOT NULL,
  time INTEGER NOT NULL,
  latitude REAL,
  longitude REAL,
  accuracy REAL,
  distance_meters REAL,
  status TEXT NOT NULL DEFAULT 'verified',
  FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_events_emp_day ON attendance_events(employee_id, day);
CREATE INDEX IF NOT EXISTS idx_events_day ON attendance_events(day);
CREATE INDEX IF NOT EXISTS idx_events_time ON attendance_events(time DESC);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Backward compatibility view
CREATE VIEW IF NOT EXISTS workers AS SELECT id, emp_code, username, name, role, department, password_salt, password_hash, created_at, active FROM employees;
