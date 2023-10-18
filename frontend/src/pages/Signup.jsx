import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  login_user_google,
  reset,
  signup_user,
} from "../redux/features/auth/auth_slice";

const Signup = () => {
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const [isLoading_Signup, setIsLoading_Signup] = useState(false);
  const [isLoading_Signup_Google, setIsLoading_Signup_Google] = useState(false);
  const {
    Auth_Login,
    isSuccessAuth,
    isLoadingAuth,
    isErrorAuth,
    responseMessage,
    response,
  } = useSelector((state) => state.Auth_Login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify_success = () => {
    toast.success("Signup Success!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_success_google = () => {
    toast.success("Signup Success, Signing in. . .", {
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

    // setIsLoading_Signup(true);
    dispatch(signup_user(input_data_signup));
    // axios
    //   .post("http://localhost:5555/api/auth/signup", {
    //     username: input.username,
    //     email: input.email,
    //     password: input.password,
    //   })
    //   .then((res) => {
    //     setInput({ ...input, username: "", email: "", password: "" });
    //     notify_success();
    //     setTimeout(() => {
    //       setIsLoading(false);
    //       navigate("/");
    //     }, 4000);
    //   })
    //   .catch((error) => {
    //     if (
    //       error.response.status === 403 &&
    //       error.response.data.system_message ===
    //         "email and username is already taken!"
    //     ) {
    //       notify_error_403_username_email();
    //     } else if (
    //       error.response.status === 403 &&
    //       error.response.data.system_message === "email already taken!"
    //     ) {
    //       notify_error_403_email();
    //     } else if (
    //       error.response.status === 403 &&
    //       error.response.data.system_message === "username is already taken!"
    //     ) {
    //       notify_error_403_username();
    //     }
    //     setIsLoading(false);
    //   });
  };

  useEffect(() => {
    if (isErrorAuth) {
      setIsLoading_Signup(false);
      setIsLoading_Signup_Google(false);
    }

    if (isLoadingAuth) {
      setIsLoading_Signup(true);
      setIsLoading_Signup_Google(true);
    }

    if (isSuccessAuth) {
      if (response.status == 201) {
        // alert("gg");
        notify_success();
        setTimeout(() => {
          setIsLoading_Signup(isLoadingAuth);
          // navigate("/");
        }, 4000);
      }

      if (response.status == 200 && response?.data?.login_method === "Google") {
        notify_success();
      }

      if (
        response?.data?.login_method === "Google" &&
        response?.data?.system_message === "User Created!"
      ) {
        notify_success_google();
      }

      // if (
      //   response.status == 201 &&
      //   response?.data?.login_method === "Google" &&
      //   response?.data?.system_message === "User Created!"
      // ) {
      //   notify_success_google();
      // }

      // if (
      //   response.status == 201 &&
      //   response?.data?.system_message === "User Exist!"
      // ) {
      //   notify_success_google();
      // }
    }

    // console.log(response.status);

    // if (isSuccessAuth) {
    //   if (!response?.data?.login_method) {
    //     setIsLoading_Signup(true);
    //   } else {
    //     setIsLoading_Signup_Google(isSuccessAuth);
    //     notify_success();
    //   }
    // }

    // if (isSuccessAuth && !response?.data.login_method) {
    //   // notify_success();
    //   setInput({ ...input, username: "", email: "", password: "" });
    //   setTimeout(() => {
    //     setIsLoading_Signup(isLoadingAuth);
    //     // navigate("/");
    //   }, 4000);
    // } else if (isSuccessAuth && response?.data.login_method === "Google") {
    //   setIsLoading_Signup_Google(isSuccessAuth);
    //   notify_success();
    //   // setIsLoading_Signup(isLoadingAuth);
    // }

    // console.log(isSuccessAuth);

    switch (responseMessage) {
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
    Auth_Login,
    isSuccessAuth,
    isLoadingAuth,
    isErrorAuth,
    responseMessage,
    response,
  ]);
  return (
    <>
      <div className="mx-auto h-screen flex justify-center items-center">
        <div className="p-5 w-screen max-w-lg border-[1px] border-gray-400 rounded-md">
          <h1 className="text-3xl text-center font-semibold my-7">
            Register Account
          </h1>
          <form
            action=""
            onSubmit={submitInput}
            className="flex flex-col gap-4 "
          >
            <input
              type="text"
              placeholder="username"
              className="border p-3 rounded-lg focus:outline-none"
              id="username"
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              value={input.username}
              required
            />
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg focus:outline-none"
              id="email"
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              value={input.email}
              required
            />
            <input
              type="password"
              placeholder="passowrd"
              className="border p-3 rounded-lg focus:outline-none"
              id="passowrd"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              value={input.password}
              required
            />
            <button
              disabled={isLoading_Signup ? true : false}
              className="bg-slate-700 text-white font-bold p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed h-[50px] transition-all duration-500 ease-in-out "
            >
              {isLoading_Signup == true &&
              response?.status == 201 &&
              !response.data.login_method ? (
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
            <OAuth
              isLoading_Signup={isLoading_Signup}
              setIsLoading_Signup={setIsLoading_Signup}
              isLoading_Signup_Google={isLoading_Signup_Google}
              setIsLoading_Signup_Google={setIsLoading_Signup_Google}
              notify_success_google={notify_success_google}
            />
          </form>
          <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to={"/"}>
              <span className="text-blue-700 font-semibold hover:text-blue-500">
                Sign in
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
