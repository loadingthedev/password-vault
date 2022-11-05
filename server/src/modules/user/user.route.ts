import { FastifyError } from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

function userRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void
) {
  done();
}

export default userRoutes;
