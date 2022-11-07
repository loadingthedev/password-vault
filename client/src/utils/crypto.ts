import { AES, enc, PBKDF2, SHA256 } from "crypto-js";

export function hashPassword(password: string): string {
  return SHA256(password).toString();
}

export function generateVaultKey({
  email,
  hashedPassword,
  salt,
}: {
  email: string;
  hashedPassword: string;
  salt: string;
}) {
  return PBKDF2(`${email}:${hashedPassword}`, salt, {
    keySize: 32,
  }).toString();
}

export function encryptvault({
  vault,
  vaultKey,
}: {
  vault: string;
  vaultKey: string;
}) {
  return AES.encrypt(vault, vaultKey).toString();
}

export function decryptvault({
  vault,
  vaultKey,
}: {
  vault: string;
  vaultKey: string;
}) {
  const bytes = AES.decrypt(vault, vaultKey);
  const decrypted = bytes.toString(enc.Utf8);

  try {
    return JSON.parse(decrypted).vault;
  } catch (error) {
    return null;
  }
}
