import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { login_user, reset } from "../redux/features/auth/auth_slice";

const Signin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [isloading, setIsLoading] = useState(false);
  const {
    Auth_Login,
    isLoadingUser,
    isErrorUser,
    isSuccessUser,
    responseMessage,
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
    setIsLoading(true);
    dispatch(login_user(input_data_login));
    // axios
    //   .post("http://localhost:5555/api/auth/signin", {
    //     email: input.email,
    //     password: input.password,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     notify_success();
    //     // setTimeout(() => {
    //     setIsLoading(false);
    //     //   navigate("/");
    //     // }, 4000);
    //     // setInput({ ...input, email: "", password: "" });
    //   })
    //   .catch((error) => {
    //     if (
    //       error.response.status === 403 &&
    //       error.response.data.system_message === "Email not found!"
    //     ) {
    //       notify_error_403_email();
    //     } else if (
    //       error.response.status === 403 &&
    //       error.response.data.system_message === "Wrong password!"
    //     ) {
    //       notify_error_403_password();
    //     }
    //     setIsLoading(false);
    //   });
  };

  useEffect(() => {
    if (isErrorUser) {
      setIsLoading(false);
    }

    if (isSuccessUser) {
      notify_success();
      setInput({ ...input, email: "", password: "" });
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
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
  }, [Auth_Login, isLoadingUser, isErrorUser, isSuccessUser, responseMessage]);

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
        <form action="" onSubmit={submitInput} className="flex flex-col gap-4 ">
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
            disabled={isloading ? true : false}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed h-[50px]"
          >
            {isloading == true ? (
              <>
                <div className="flex justify-center items-center text-[20px]">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {/* <div className="flex gap-2 mt-2">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700 font-semibold hover:text-blue-500">
              Sign in
            </span>
          </Link>
        </div> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Signin;
