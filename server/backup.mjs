import { DatabaseSync, backup } from 'node:sqlite';
import { mkdirSync, cpSync, readdirSync, lstatSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
const source = resolve(process.env.DATA_DIR || 'server/data');
const destination = resolve(process.env.BACKUP_DIR || 'server/backups', new Date().toISOString().replaceAll(':', '-'));
mkdirSync(destination, { recursive: true });
const db = new DatabaseSync(join(source, 'yukomon.sqlite'), { readOnly: true });
await backup(db, join(destination, 'yukomon.sqlite'));
cpSync(join(source, 'media'), join(destination, 'media'), { recursive: true });
cpSync(join(source, 'media-signing-key'), join(destination, 'media-signing-key'));
db.close();
const backupRoot = resolve(destination, '..');
const cutoff = Date.now() - 30 * 86400000;
for (const name of readdirSync(backupRoot)) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.\d{3}Z$/.test(name)) continue;
  const time = Date.parse(name.replace(/T(\d{2})-(\d{2})-(\d{2})/, 'T$1:$2:$3'));
  const candidate = join(backupRoot, name), info = lstatSync(candidate);
  if (Number.isFinite(time) && time < cutoff && info.isDirectory() && !info.isSymbolicLink()) rmSync(candidate, { recursive: true });
}
console.log(destination);
