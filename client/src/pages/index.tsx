import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";

const Home: NextPage = () => {
  const [step, setStep] = useState<"login" | "register" | "vault">("register");

  return (
    <>
      <Head>
        <title>Password Manager</title>
        <meta name="description" content="Password manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {step === "login" && <LoginForm />}
        {step === "register" && <RegisterForm />}
        {step === "vault" && <Vault />}
      </main>
    </>
  );
};

export default Home;
