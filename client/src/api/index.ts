import axios from "axios";

const USER_BASE_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users`;
const VAULT_BASE_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/vault`;

export function registerUser(payload: {
  hashedPassword: string;
  email: string;
}) {
  return axios
    .post<{ salt: string; vault: string }>(USER_BASE_URL, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export function loginUser(payload: { hashedPassword: string; email: string }) {
  return axios
    .post<{ salt: string; vault: string }>(`${USER_BASE_URL}/login`, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export function saveVault({ encryptedVault }: { encryptedVault: string }) {
  return axios
    .put(
      VAULT_BASE_URL,
      { encryptedVault },
      {
        withCredentials: true,
      }
    )
    .then((res) => res.data);
}
