import React from "react";
import SignInForm from "./signin-form";
import { BACKEND_URL } from "~/lib/constants";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>

      <SignInForm />
      <hr />
      <a
        className="border px-4 py-2 rounded bg-primary/70 text-white flex items-center gap-2"
        href={`${BACKEND_URL}/auth/github/login`}
      >
        <FaGithub />
        Sign In With Github
      </a>
      <div className=" flex flex-col gap-2"></div>
    </div>
  );
};

export default SignInPage;
