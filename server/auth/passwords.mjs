import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const derive = promisify(scrypt);
const parameters = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const encodedPattern = /^scrypt\$32768\$8\$1\$([a-f0-9]{32})\$([a-f0-9]{64})$/;
const dummySalt = Buffer.alloc(16);
const dummyHash = Buffer.alloc(32);

export async function hashSecret(secret) {
  const salt = randomBytes(16);
  const key = await derive(secret, salt, 32, parameters);
  return `scrypt$32768$8$1$${salt.toString('hex')}$${key.toString('hex')}`;
}

export async function verifySecret(secret, encoded) {
  const match = typeof encoded === 'string' && encoded.match(encodedPattern);
  // Unknown accounts still perform the same password derivation.
  const salt = match ? Buffer.from(match[1], 'hex') : dummySalt;
  const expected = match ? Buffer.from(match[2], 'hex') : dummyHash;
  const actual = await derive(secret, salt, 32, parameters);
  return timingSafeEqual(actual, expected) && !!match;
}

export function newRecoveryCode() {
  return randomBytes(16).toString('hex').toUpperCase().match(/.{8}/g).join('-');
}
