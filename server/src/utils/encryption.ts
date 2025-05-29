import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Generate a proper 32-byte key for AES-256
const generateKey = (key: string): Buffer => {
  return crypto.createHash('sha256').update(key).digest();
};

const ENCRYPTION_KEY = generateKey(process.env.ENCRYPTION_KEY || 'prime_skin_clinic_default_encryption_key_2025');
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * Encrypts text using AES-256-CBC algorithm
 * @param text - Text to encrypt
 * @returns Encrypted text
 */
export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

/**
 * Decrypts text using AES-256-CBC algorithm
 * @param text - Text to decrypt
 * @returns Decrypted text
 */
export const decrypt = (text: string): string => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift() || '', 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
