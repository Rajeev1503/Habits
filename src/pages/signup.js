
import Link from "next/link";
import Button from "../shared/FormElements/button";
import Input from "../shared/FormElements/input";
import { useForm } from "../hooks/form-hook";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUp = () => {
  const router = useRouter();

const [ifLoading, setIfLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    setIfLoading(true);
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
        setIfLoading(false);
      }
    } catch (error) {
      setIfLoading(false);
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
    <div className="py-8">
      {ifLoading?<div className="text-white">Loading...</div>: ''}
      <div className="text-lighttext flex flex-col gap-2 items-center font-semibold" >
        {/* <div className="text-center">
          <FaList size={40} />
        </div> */}
        <h1 className="text-2xl">Welcome To Taskify!</h1>
        <h1 className="text-sm text-gray-500">We are happy to have you onboard!</h1>
      </div>
      <div className=" flex flex-row justify-center items-center text-lighttext font-semibold rounded-lg">
        <div className="w-4/5 flex flex-col gap-5">
          <form
            className="flex flex-col w-full"
            action="/api/user"
            method="POST"
            onSubmit={onSubmitHandler}
          >
            <br></br>
            <div className="flex flex-row gap-5">
            <div className="flex-grow flex flex-col">
            <label htmlFor="fullname" className="py-1">Full Name</label>
            <Input
              id="fullname"
              element="input"
              type="text"
              lable="usernameoremail"
              errorText="Required"
              validators="REQUIRE"
              onInput={inputHandler}
            />
            <label htmlFor="usernameoremail" className="py-1 mt-2">Choose Username</label>
            <Input
              id="usernameoremail"
              element="input"
              type="text"
              lable="usernameoremail"
              errorText="Required"
              validators="REQUIRE"
              onInput={inputHandler}
            />
            
            </div>
            <div className="flex-grow flex flex-col">
            
            <label htmlFor="email" className="py-1">Email</label>
            <Input
              id="email"
              element="input"
              type="password"
              lable="password"
              errorText="Password length should be minimum 8 characters"
              validators="REQUIRE"
              onInput={inputHandler}
            />
            <label htmlFor="password" className="py-1 mt-2">Password</label>
            <Input
              id="password"
              element="input"
              type="password"
              lable="password"
              errorText="Password length should be minimum 8 characters"
              validators="REQUIRE"
              onInput={inputHandler}
            />
            </div>
            </div>
            <br/>
            <br/>
            <Button
              type="submit"
              className="submit"
              disabled={!formState.isValid}
            >
              SignUp
            </Button>
          </form>
        </div>
      </div>
      </div>
  );
};

export default SignUp;

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