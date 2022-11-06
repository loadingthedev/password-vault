import { PBKDF2, SHA256 } from "crypto-js";

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
