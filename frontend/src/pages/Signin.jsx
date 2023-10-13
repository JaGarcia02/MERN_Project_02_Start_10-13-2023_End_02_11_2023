import React from "react";
import { Link } from "react-router-dom";
const Signin = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
        />
        <input
          type="text"
          placeholder="passowrd"
          className="border p-3 rounded-lg focus:outline-none"
          id="passowrd"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 font-semibold hover:text-blue-500">
            Sign in
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
