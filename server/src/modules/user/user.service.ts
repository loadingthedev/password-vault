import { UserModel } from "./user.model";
import crypto from "crypto";
import argon2 from "argon2";

export const generateSalt = () => crypto.randomBytes(16).toString("hex");

export async function createUser(input: {
  hashedPassword: string;
  email: string;
}) {
  return UserModel.create({
    email: input.email,
    password: input.hashedPassword,
  });
}

async function getHash(password: string) {
  return argon2.hash(password);
}

export async function findUserByEmailAndPassword({
  email,
  hashedPassword,
}: {
  email: string;
  hashedPassword: string;
}) {
  const user = await UserModel.findOne({ email });
  const hash = await getHash(hashedPassword);

  if (!user || !argon2.verify(user.password, hash)) {
    return null;
  }

  return user;
}
