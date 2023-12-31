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
  const [elementState, setElement_State] = useState({
    disable: false,
    animation: false,
  });
  const {
    Auth_User,
    response_Login,
    isLoadingAuth_Login,
    isSuccessAuth_Login,
    isErrorAuth_Login,
    responseMessage_Login,
    isSuccessAuth_Google,
    response_Google,
  } = useSelector((state) => state.Auth_User);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // notfication tostify
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

    // setIsLoading_Signin(true);
    dispatch(login_user(input_data_login));
  };

  useEffect(() => {
    if (isLoadingAuth_Login) {
      setElement_State({ ...elementState, loading: true, animation: true });
    }

    if (isErrorAuth_Login) {
      setElement_State({
        ...elementState,
        animation: false,
        disable: false,
      });
    }

    if (isSuccessAuth_Google) {
      if (response_Google?.status == 201) {
        setElement_State({ ...elementState, disable: true });
        setTimeout(() => {
          setElement_State({ ...elementState, disable: false });
        }, 2000);
      }

      if (response_Google?.status == 200) {
        setElement_State({ ...elementState, disable: true });
        setTimeout(() => {
          setElement_State({ ...elementState, disable: false });
        }, 2000);
      }
    }

    if (isSuccessAuth_Login) {
      if (response_Login.status == 200) {
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
          navigate("/home");
        }, 2000);
      }
    }

    switch (responseMessage_Login) {
      case "Email not found!":
        notify_error_403_email();
        break;

      case "Wrong password!":
        notify_error_403_password();
        break;
    }

    dispatch(reset());
  }, [
    Auth_User,
    response_Login,
    isLoadingAuth_Login,
    isSuccessAuth_Login,
    isErrorAuth_Login,
    responseMessage_Login,
    isSuccessAuth_Google,
    response_Google,
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
                  <span>Login</span>
                </>
              )}
            </button>
            <OAuth />
          </form>

          <div className="flex gap-2 mt-5">
            {elementState.disable === true ? (
              <>
                <p>Don't have an account?</p>
                <button
                  disabled={elementState.disable ? true : false}
                  className="text-blue-700 font-semibold hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <p>Don't have an account?</p>

                <Link to={"/sign-up"}>
                  <span className="text-blue-700 font-semibold hover:text-blue-500">
                    Sign up
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

export default Signin;
