import { FastifyError } from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { registerUser } from "./user.controller";

function userRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void
) {
  app.post("/", registerUser);
  done();
}

export default userRoutes;
