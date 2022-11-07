import { type NextPage } from "next";
import { useEffect, useState } from "react";
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
  const [step, setStep] = useState<"login" | "register" | "vault">("login");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState<string>("");

  useEffect(() => {
    const vault = window.sessionStorage.getItem("vault");
    const vaultKey = window.sessionStorage.getItem("vk");

    if (vault && vaultKey) {
      setVault(JSON.parse(vault));
      setVaultKey(vaultKey);
      setStep("vault");
    } else {
      // setStep("login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Password Manager</title>
        <meta name="description" content="Password manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen items-center justify-center">
        {step === "login" && (
          <LoginForm
            setStep={setStep}
            setVaultKey={setVaultKey}
            setVault={setVault}
          />
        )}
        {step === "register" && (
          <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === "vault" && <Vault vault={vault} vaultKey={vaultKey} />}
      </main>
    </>
  );
};

export default Home;
