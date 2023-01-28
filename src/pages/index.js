import { getSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../layout/layout";
import SignIn from "./signin";
import SignUp from "./signup";
export default function Home() {
return (

<Layout title="Signin">
  <Head>
    <title>Taskify</title>
  </Head>
  <div className="bg-[url('../../public/bglines.png')] flex flex-col justify-center items-center backdrop-blur-sm" style={{height:'100vh'}}>
    <SignIn />
</div>
</Layout>
)
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