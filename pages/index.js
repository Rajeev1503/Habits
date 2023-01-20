import { getSession } from "next-auth/react";
import SignIn from "./signin";
import SignUp from "./signup";

export default function Home() {
return (<>
<div className="flex flex-row justify-center mt-8" style={{height:'100vh'}}>
    <SignIn />
</div>
</>
)
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    if (session) {
        console.log(session?.user);
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