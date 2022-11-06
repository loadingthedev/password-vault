import axios from "axios";

const USER_BASE_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users`;

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
