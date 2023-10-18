import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { login_user, reset } from "../redux/features/auth/auth_slice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [isLoading_Signin, setIsLoading_Signin] = useState(false);
  const {
    Auth_Login,
    isLoadingAuth,
    isErrorAuth,
    isSuccessAuth,
    responseMessage,
    response,
  } = useSelector((state) => state.Auth_Login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // notfication tostify
  const notify_success = () => {
    toast.success("Login Successful!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_error_403_email = () => {
    toast.error(" Email not found, please try again or signup!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  const notify_error_403_password = () => {
    toast.error("Password didn't match, please try again!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  // submit function
  const submitInput = (e) => {
    e.preventDefault();

    const input_data_login = {
      email: input.email,
      password: input.password,
    };

    setIsLoading_Signin(true);
    dispatch(login_user(input_data_login));
  };

  useEffect(() => {
    if (isSuccessAuth && response?.data.login_method !== "System") {
      setIsLoading_Signin(true);
    }

    if (isErrorAuth) {
      setIsLoading_Signin(isLoadingAuth);
    }

    if (isSuccessAuth) {
      notify_success();
      setInput({ ...input, email: "", password: "" });
      setTimeout(() => {
        setIsLoading_Signin(isLoadingAuth);
        navigate("/home");
      }, 4000);
    }

    switch (responseMessage) {
      case "Email not found!":
        notify_error_403_email();
        break;

      case "Wrong password!":
        notify_error_403_password();
        break;
    }

    dispatch(reset());
  }, [
    Auth_Login,
    isLoadingAuth,
    isSuccessAuth,
    isErrorAuth,
    responseMessage,
    response,
  ]);

  return (
    <>
      <div className="mx-auto h-screen flex justify-center items-center">
        <div className="p-5 w-screen max-w-lg border-[1px] border-gray-400 rounded-md">
          <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
          <form
            action=""
            onSubmit={submitInput}
            className="flex flex-col gap-4 "
          >
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
              disabled={isLoading_Signin ? true : false}
              className="bg-slate-700 text-white font-bold p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed h-[50px] transition-all duration-500 ease-in-out "
            >
              {isLoading_Signin == true &&
              response?.data.login_method === "System" ? (
                <>
                  <div className="flex justify-center items-center text-[20px]">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </div>
                </>
              ) : (
                <>
                  <span>Login</span>
                </>
              )}
            </button>
            <OAuth
              isSuccessAuth={isSuccessAuth}
              response={response}
              isLoading_Signin={isLoading_Signin}
            />
          </form>

          <div className="flex gap-2 mt-5">
            <p>Don't have an account?</p>
            <Link to={"/sign-up"}>
              <span className="text-blue-700 font-semibold hover:text-blue-500">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signin;
