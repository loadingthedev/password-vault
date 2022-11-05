import { FastifyError } from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

function vaultRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void
) {
  done();
}

export default vaultRoutes;
