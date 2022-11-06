import { FastifyReply, FastifyRequest } from "fastify";
import { get } from "lodash";
import logger from "../../utils/logger";
import { updateVault } from "./vault.service";

export async function updateVaultHandler(
  req: FastifyRequest<{
    Body: {
      encryptedVault: string;
    };
  }>,
  reply: FastifyReply
) {
  const userId: string = get(req, "user._id")!;
  try {
    await updateVault({
      userId,
      data: req.body.encryptedVault,
    });

    return reply.code(200).send("Vault updated successfully");
  } catch (err) {
    logger.error(err);
    return reply.code(500).send(err);
  }
}
