import { VaultModel } from "./vault.model";

export async function createVault(input: { user: string; salt: string }) {
  return VaultModel.create(input);
}

export async function updateVault(input: { userId: string; data: string }) {
  return VaultModel.updateOne({ user: input.userId }, { data: input.data });
}
