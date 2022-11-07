import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { loginUser } from "../api";
import type { VaultItem } from "../pages";
import { decryptvault, generateVaultKey, hashPassword } from "../utils/crypto";
import FormWrapper from "./FormWrapper";

interface LoginFormProps {
  setStep: Dispatch<SetStateAction<"login" | "register" | "vault">>;
  setVaultKey: Dispatch<SetStateAction<string>>;
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
}

const LoginForm = ({ setVaultKey, setStep, setVault }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
    hashedPassword: string;
  }>();

  const mutation = useMutation(loginUser, {
    onSuccess: ({ salt, vault }) => {
      const email = getValues("email");
      const hashedPassword = getValues("hashedPassword");

      const vaultKey = generateVaultKey({
        email,
        hashedPassword,
        salt,
      });

      const decryptedVault = decryptvault({
        vault,
        vaultKey,
      });

      window.sessionStorage.setItem("vk", vaultKey);
      window.sessionStorage.setItem("vault", JSON.stringify(decryptedVault));
      setVaultKey(vaultKey);
      setVault(decryptedVault);
      setStep("vault");
    },
  });

  const handleFormSubmit = () => {
    const email = getValues("email");
    const password = getValues("password");

    const hashedPassword = hashPassword(password);
    setValue("hashedPassword", hashedPassword);

    mutation.mutate({ email, hashedPassword });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(handleFormSubmit)}>
      <h1 className="text-3xl font-bold">Login</h1>

      <div className="flex flex-col gap-2">
        <div className="flex  w-full flex-col justify-center">
          <label htmlFor="email" className="w-1/5 text-sm font-bold">
            Email
          </label>
          <input
            type="email"
            className="rounded border-2 bg-gray-100 p-2"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              minLength: {
                value: 5,
                message: "Email must be at least 5 characters",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex w-full flex-col  justify-center">
          <label htmlFor="password" className="w-1/5 text-sm font-bold">
            Password
          </label>
          <input
            type="password"
            className=" grow  rounded border-2 bg-gray-100 p-2"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-1/2 rounded bg-blue-500 p-2  text-white"
        >
          Login
        </button>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
