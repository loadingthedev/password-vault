import mongoose from "mongoose";
import { DB_URL } from "../constant";
import logger from "./logger";

export async function connectToDb(): Promise<void> {
  try {
    logger.info("Connecting to database...");
    await mongoose.connect(DB_URL);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error(err, "Failed to connect to MongoDB");
    process.exit(1);
  }
}

export async function disconnectFromDb(): Promise<void> {
  logger.info("Disconnecting from database...");
  await mongoose.connection.close();
  logger.info("Disconnected from MongoDB");
  return;
}
