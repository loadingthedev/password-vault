import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

const Home: NextPage = () => {
  const [step, setStep] = useState<"login" | "register" | "vault">("register");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState<string>("");

  return (
    <>
      <Head>
        <title>Password Manager</title>
        <meta name="description" content="Password manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen items-center justify-center">
        {step === "login" && <LoginForm />}
        {step === "register" && (
          <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === "vault" && <Vault />}
      </main>
    </>
  );
};

export default Home;
