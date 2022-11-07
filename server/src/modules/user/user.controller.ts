import { FastifyReply, FastifyRequest } from "fastify";
import { COOKIE_DOMAIN } from "../../constant";
import logger from "../../utils/logger";
import { createVault, findVaultByUser } from "../vault/vault.service";
import {
  createUser,
  findUserByEmailAndPassword,
  generateSalt,
} from "./user.service";

export async function registerUser(
  request: FastifyRequest<{
    Body: Parameters<typeof createUser>[number];
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const user = await createUser(body);

    const salt = generateSalt();

    const vault = await createVault({ user: user._id, salt });

    const accessToken = await reply.jwtSign({
      id: user._id,
      email: user.email,
    });

    reply.setCookie("token", accessToken, {
      domain: COOKIE_DOMAIN,
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: false,
    });

    return reply.code(201).send({
      accessToken,
      salt,
      vault: vault.data,
    });
  } catch (err) {
    logger.error(err, "Error while registering user");
    return reply.code(500).send(err);
  }
}

export async function loginUser(
  request: FastifyRequest<{
    Body: Parameters<typeof createUser>[number];
  }>,
  reply: FastifyReply
) {
  try {
    const user = await findUserByEmailAndPassword(request.body);
    if (!user) {
      return reply.code(401).send({
        message: "Invalid credentials",
      });
    }

    const vault = await findVaultByUser(user._id);
    if (!vault) {
      return reply.code(500).send({
        message: "Vault not found",
      });
    }

    const accessToken = await reply.jwtSign({
      id: user._id,
      email: user.email,
    });

    reply.setCookie("token", accessToken, {
      domain: COOKIE_DOMAIN,
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: false,
    });

    return reply.code(200).send({
      accessToken,
      vault: vault.data,
      salt: vault.salt,
    });
  } catch (err) {
    logger.error(err, "Error while logging in user");
    return reply.code(500).send(err);
  }
}
