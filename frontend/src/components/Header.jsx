import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { check_token, reset } from "../redux/features/auth/auth_slice";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";

const Header = () => {
  const {
    Auth_Login,
    isLoadingAuth,
    isErrorAuth,
    isSuccessAuth,
    responseMessage,
  } = useSelector((state) => state.Auth_Login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = {
    token: Cookie.get("user_token"),
  };

  useEffect(() => {
    if (isErrorAuth) {
      alert("Your session has expired, Please Signin again!\nSystem Admin");
      Cookie.remove("user_token");
      localStorage.removeItem("user_token");
      navigate("/");
      location.reload();
    }
    dispatch(reset());
  }, [Auth_Login, isLoadingAuth, isSuccessAuth, isErrorAuth, responseMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      const LocalStorage_Token = {
        token: localStorage.getItem("user_token"),
      };

      if (!Cookie.get("user_token")) {
        alert("No Token Found! Plase Signin again.\nSystem Admin");
        Cookie.remove("user_token");
        localStorage.removeItem("user_token");
        navigate("/");
        location.reload();
      }
      if (
        JSON.stringify(Cookie.get("user_token")) !== LocalStorage_Token.token
      ) {
        alert(
          "Invalid Token / Token not recognize! Plase Signin again.\nSystem Admin"
        );
        Cookie.remove("user_token");
        localStorage.removeItem("user_token");
        navigate("/");
        location.reload();
      }

      dispatch(check_token(token));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">JaCorp</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center  ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64" // <--- this can be responsive to modify the size of the textbox
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 text-slate-700 cursor-pointer font-semibold">
          <Link to={"/home"}>
            <li
              className="hidden sm:inline hover:underline" // this will hide the home list if the screen size is small
            >
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to={"/"}>
            <li className="hover:underline">Login</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

// For responsive purposes we can set max with of the screen size
// just add it on the content in the tailwindcss.config.js
