import { UserModel } from "./user.model";
import crypto from "crypto";

// generate salt
export const generateSalt = () => crypto.randomBytes(16).toString("hex");

// create a user
export async function createUser(input: {
  hashedPassword: string;
  email: string;
}) {
  return UserModel.create({
    email: input.email,
    password: input.hashedPassword,
  });
}
