import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import Layout from "../layout/layout";
import SignIn from "./signin";
import SignUp from "./signup";
export default function Home() {
  const [loginSignup, setLoginSignup] = useState(<SignIn />);
  const [loginActive, setLoginActive] = useState(true);

  return (
    <Layout title="Signin">
      <Head>
        <title>Habits</title>
      </Head>
      <div
        className="bg-main-background-dark flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="rounded-lg border border-border-dark w-3/6 max-h-min overflow-hidden">
          <div className="flex flex-row justify-between items-center text-center bg-accent-background-dark text-lighttext font-semibold text-sm">
            <div
              className={`${
                loginActive ? "bg-main-background-dark cursor-default" : "cursor-pointer"
              } flex-grow p-3`}
              onClick={() => {
                if (loginActive) {
                  return;
                }
                setLoginSignup(<SignIn />);
                setLoginActive(true);
              }}
            >
              SIGNIN
            </div>
            <div
              className={`${
                !loginActive ? "bg-main-background-dark cursor-default" : "cursor-pointer"
              } flex-grow p-3`}
              onClick={() => {
                if (!loginActive) {
                  return;
                }
                setLoginSignup(<SignUp />);
                setLoginActive(false);
              }}
            >
              SIGNUP
            </div>

          </div>
          <div className="px-5">{loginSignup}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
