import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import cors from "@fastify/cors";
import { CORS_ORIGIN } from "../constant";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import userRoutes from "../modules/user/user.route";
import vaultRoutes from "../modules/vault/vault.route";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

async function createServer() {
  const app = fastify();

  app.register(cors, {
    origin: CORS_ORIGIN,
    credentials: true,
  });

  app.register(jwt, {
    secret: {
      private: fs.readFileSync(
        `${path.join(process.cwd(), "certs")}\\private.key`
      ),
      public: fs.readFileSync(
        `${path.join(process.cwd(), "certs")}\\public.key`
      ),
    },
    sign: {
      algorithm: "RS256",
    },
    cookie: {
      cookieName: "token",
      signed: false,
    },
  });

  app.register(cookie);

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await request.jwtVerify<{
          _id: string;
        }>();
        request.user = user;
      } catch (err) {
        return reply.send(err);
      }
    }
  );

  // routes
  app.register(userRoutes, {
    prefix: "api/users",
  });
  app.register(vaultRoutes, {
    prefix: "api/vault",
  });

  return app;
}

export default createServer;
