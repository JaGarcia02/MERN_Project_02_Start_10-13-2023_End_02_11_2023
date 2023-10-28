import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { reset, signup_user } from "../redux/features/auth/auth_slice";

const Signup = () => {
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const [elementState, setElement_State] = useState({
    disable: false,
    animation: false,
  });
  const {
    Auth_User,
    response_Signup,
    isLoadingAuth_Signup,
    isSuccessAuth_Signup,
    isErrorAuth_Signup,
    responseMessage_Signup,
    isSuccessAuth_Google,
    response_Google,
  } = useSelector((state) => state.Auth_User);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify_success = () => {
    toast.success("Signup Success!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 2000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_success_google = () => {
    toast.success("Signup Success, Now Signing in. . .", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 2000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_success_google_signingin = () => {
    toast.success("Now Signing in, Please wait. . .", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_error_403_email = () => {
    toast.error(" Email already in use, please try again!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  const notify_error_403_username = () => {
    toast.error(" Username already in use, please try again!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  const notify_error_403_username_email = () => {
    toast.error(" Email and Username already in use, please try again!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  const submitInput = (e) => {
    e.preventDefault();

    const input_data_signup = {
      username: input.username,
      email: input.email,
      password: input.password,
    };

    dispatch(signup_user(input_data_signup));
  };

  useEffect(() => {
    if (isLoadingAuth_Signup) {
      setElement_State({ ...elementState, animation: true, disable: true });
    }

    if (isErrorAuth_Signup) {
      setElement_State({ ...elementState, animation: false, disable: false });
    }

    if (isSuccessAuth_Google) {
      if (response_Google?.status == 201) {
        setElement_State({ ...elementState, disable: true });
        notify_success_google();
        setTimeout(() => {
          setElement_State({ ...elementState, disable: true });
        }, 2000);
      }

      if (response_Google?.status == 200) {
        setElement_State({ ...elementState, disable: true });
        setTimeout(() => {
          setElement_State({ ...elementState, disable: true });
        }, 2000);
      }
    }

    if (isSuccessAuth_Signup) {
      if (response_Signup.status == 201) {
        notify_success();
        setElement_State({
          ...elementState,
          disable: true,
          animation: true,
        });
        setTimeout(() => {
          setElement_State({
            ...elementState,
            disable: false,
            animation: false,
          });
          navigate("/");
        }, 2000);
      }
    }

    switch (responseMessage_Signup) {
      case "email and username is already taken!":
        notify_error_403_username_email();
        break;

      case "email already taken!":
        notify_error_403_email();

      case "username is already taken!":
        notify_error_403_username();
        break;
    }

    dispatch(reset());
  }, [
    Auth_User,
    response_Signup,
    isLoadingAuth_Signup,
    isSuccessAuth_Signup,
    isErrorAuth_Signup,
    responseMessage_Signup,
    isSuccessAuth_Google,
    response_Google,
  ]);

  return (
    <>
      <div className="mx-auto h-screen flex justify-center items-center">
        <div className="p-5 w-screen max-w-lg border-[1px] border-gray-400 rounded-md">
          <h1 className="text-3xl text-center font-semibold my-7">
            Register Account
          </h1>
          <form onSubmit={submitInput} className="flex flex-col gap-4 ">
            <input
              type="text"
              placeholder="username"
              className="border p-3 rounded-lg focus:outline-none"
              id="username"
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              value={input.username}
              disabled={elementState.disable ? true : false}
              required
            />
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg focus:outline-none"
              id="email"
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              value={input.email}
              disabled={elementState.disable ? true : false}
              required
            />
            <input
              type="password"
              placeholder="passowrd"
              className="border p-3 rounded-lg focus:outline-none"
              id="passowrd"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              value={input.password}
              disabled={elementState.disable ? true : false}
              required
            />
            <button
              disabled={elementState.disable ? true : false}
              className="bg-slate-700 text-white font-bold p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed h-[50px] transition-all duration-500 ease-in-out "
            >
              {elementState.animation === true ? (
                <>
                  <div className="flex justify-center items-center text-[20px]">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </div>
                </>
              ) : (
                <>
                  <span>Submit</span>
                </>
              )}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5">
            {elementState.disable === true ? (
              <>
                <p>Have an account?</p>
                <button
                  disabled={elementState.disable ? true : false}
                  className="text-blue-700 font-semibold hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                <p>Have an account?</p>
                <Link to={"/"}>
                  <span className="text-blue-700 font-semibold hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-70">
                    Sign in
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
