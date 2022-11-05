import { FastifyInstance } from "fastify";
import createServer from "./utils/createServer";
import { connectToDb, disconnectFromDb } from "./utils/db";
import logger from "./utils/logger";
import "dotenv/config";

const gracefulShutdown = (signal: string, app: FastifyInstance) => {
  process.on(signal, async () => {
    logger.info(`Received ${signal}, shutting down...`);
    app.close();
    await disconnectFromDb();
    process.exit(0);
  });
};

async function main() {
  const app = await createServer();

  try {
    const url = await app.listen({ port: 4000 });
    await connectToDb();
    logger.info(`Server listening on ${url}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  const signals: NodeJS.Signals[] = ["SIGTERM", "SIGINT"];

  for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i], app);
  }
}

main();
