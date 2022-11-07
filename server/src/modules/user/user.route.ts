import { FastifyError } from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { loginUser, registerUser } from "./user.controller";

function userRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void
) {
  app.post("/", registerUser);
  app.post("/login", loginUser);
  done();
}

export default userRoutes;
