import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export function openDatabase(path) {
  mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA journal_mode=WAL;
    PRAGMA foreign_keys=ON;
    PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, identity TEXT UNIQUE NOT NULL, nickname TEXT NOT NULL,
      city TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', settings TEXT NOT NULL DEFAULT '{}', created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      mime TEXT NOT NULL, size INTEGER NOT NULL, hash TEXT NOT NULL, filename TEXT NOT NULL,
      duration REAL NOT NULL DEFAULT 0, created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS catches (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      species_id TEXT, status TEXT NOT NULL, body TEXT NOT NULL, photo_hash TEXT NOT NULL,
      media_id TEXT NOT NULL REFERENCES media(id), video_id TEXT REFERENCES media(id), created_at INTEGER NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS catch_photo ON catches(user_id, photo_hash);
    CREATE INDEX IF NOT EXISTS catch_user_time ON catches(user_id, created_at DESC);
    CREATE TABLE IF NOT EXISTS likes (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      catch_id TEXT NOT NULL REFERENCES catches(id) ON DELETE CASCADE,
      PRIMARY KEY(user_id, catch_id)
    );
    CREATE TABLE IF NOT EXISTS shares (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      catch_id TEXT NOT NULL REFERENCES catches(id) ON DELETE CASCADE, ur INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS requests (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, request_key TEXT NOT NULL,
      fingerprint TEXT NOT NULL, response TEXT NOT NULL, created_at INTEGER NOT NULL,
      PRIMARY KEY(user_id, request_key)
    );
    CREATE TABLE IF NOT EXISTS submissions (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, created_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS submission_time ON submissions(user_id, created_at);
    PRAGMA user_version=1;
  `);
  return db;
}

export function transaction(db, fn) {
  db.exec('BEGIN IMMEDIATE');
  try { const result = fn(); db.exec('COMMIT'); return result; }
  catch (error) { db.exec('ROLLBACK'); throw error; }
}
