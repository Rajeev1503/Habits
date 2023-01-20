import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout/layout";
import Button from "../components/shared/components/FormElements/button";
import Input from "../components/shared/components/FormElements/input";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { useForm } from "../components/shared/hooks/form-hook";
import { getSession, signIn } from "next-auth/react";
// import { useEffect } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
const SignIn = () => {
  const router = useRouter();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace("/app");
  //     } else return;
  //   });
  // }, [router]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUserHandler = {
      usernameoremail: formState.inputs.usernameoremail.value,
      password: formState.inputs.password.value,
    };
    try {
      const result = await signIn("credentials", {
        redirect: false,
        usernameoremail: newUserHandler.usernameoremail,
        password: newUserHandler.password,
      });
      if (!result.error) {
        router.replace("/app");
      }
    } catch (error) {
      throw new Error(
        "Login failed message from signin page nextauth : " + error
      );
    }
  };

  const [formState, inputHandler] = useForm(
    {
      usernameoremail: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <Layout title="Signin">
      <Head>
        <title>Signin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="text-lighttext mb-8 flex flex-col gap-2 items-center">
        <div className="text-center">
          <FaList size={40} />
        </div>
        <h1 className="">Signin To Taskify</h1>
      </div>
      <div className="text-lighttext font-semibold  p-4 rounded-lg">
        <div className="flex flex-col gap-8">
          <form
            className="flex flex-col w-full gap-4"
            action="/api/user"
            method="POST"
            onSubmit={onSubmitHandler}
          >
            <br></br>
            <Input
              id="usernameoremail"
              element="input"
              type="text"
              placeholder="username or email"
              lable="Email"
              errorText="Required"
              validators="REQUIRE"
              onInput={inputHandler}
            />
            <Input
              id="password"
              element="input"
              type="password"
              placeholder="Enter New Password"
              lable="Enter New Password"
              errorText="Password length should be minimum 8 characters"
              validators="REQUIRE"
              onInput={inputHandler}
            />
            <Button
              type="submit"
              className="submit"
              disabled={!formState.isValid}
            >
              Login
            </Button>
          </form>
          <br />
          <div className="quick-signin-wrapper flex flex-col gap-2">
            <div className="w-full bg-lighttext text-darktext flex gap-2 justify-center items-center p-1 rounded-lg text-xs">
              <span className="max-w-max">
                <FaGithub size={20} />
              </span>
              <span className="max-w-max">Login Using Github</span>
            </div>
            <div className="w-full bg-lighttext text-darktext flex gap-2 justify-center items-center p-1 rounded-lg text-xs">
              <span className="max-w-max">
                <FaGoogle size={20} />
              </span>
              <span className="max-w-max">Login Using Google</span>
            </div>
          </div>
          <div className="w-full bg-lighttext text-darktext p-1 rounded-lg">
            New to taskify? <Link href="/user/signup">Create your account</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session?.user) {
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