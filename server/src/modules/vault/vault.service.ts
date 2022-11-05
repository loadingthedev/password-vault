import { VaultModel } from "./vault.model";

export async function createVault(input: { user: string; salt: string }) {
  return VaultModel.create(input);
}
