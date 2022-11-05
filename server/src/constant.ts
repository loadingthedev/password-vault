import "dotenv/config";

export const DB_URL =
  process.env.DB_URL || "mongodb://localhost:27017/password-manager";

export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
