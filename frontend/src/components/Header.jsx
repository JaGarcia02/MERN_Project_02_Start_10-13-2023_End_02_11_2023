import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { check_token, reset } from "../redux/features/auth/auth_slice";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { reset_user } from "../redux/features/user/user_slice";

const Header = () => {
  const {
    Auth_User,
    isLoadingAuth,
    isErrorAuth,
    isSuccessAuth,
    responseMessage,
    response,
  } = useSelector((state) => state.Auth_User);
  const {
    User,
    isLoadingUser_Delete,
    isSuccessUser_Delete,
    isErrorUserUser_Delete,
    responseMessage_Delete,
    response_Delete,
    isLoadingUser_UpdateProfilePicture,
    isSuccessUser_UpdateProfilePicture,
    isErrorUser_UpdateProfilePicture,
    responseMessage_UpdateProfilePicture,
    response_UpdateProfilePicture,
  } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user_data, setUser_Data] = useState([]);
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
  }, [
    Auth_User,
    isLoadingAuth,
    isSuccessAuth,
    isErrorAuth,
    responseMessage,
    response,
  ]);

  useEffect(() => {
    if (isSuccessUser_UpdateProfilePicture) {
      setUser_Data(response_UpdateProfilePicture.data);
    }

    dispatch(reset_user());
  }, [
    User,
    isLoadingUser_UpdateProfilePicture,
    isSuccessUser_UpdateProfilePicture,
    isErrorUser_UpdateProfilePicture,
    responseMessage_UpdateProfilePicture,
    response_UpdateProfilePicture,
  ]);

  // Checking token & for Authentication System
  useEffect(() => {
    const interval = setInterval(() => {
      if (!Cookie.get("user_token")) {
        alert("No Token Found! Plase Signin again.\nSystem Admin");
        Cookie.remove("user_token");
        localStorage.removeItem("user_token");
        navigate("/");
        location.reload();
      } else {
        const LocalStorage_Token = {
          token: localStorage.getItem("user_token"),
        };
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
      }

      dispatch(check_token(token));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Check if token is valid
  // useEffect(() => {
  //   const interval = setInterval(() => {}, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  // Fetching Data from database
  useEffect(() => {
    const decoded_token = jwt_decode(Cookie.get("user_token"));
    axios
      .get(`http://localhost:5555/api/user/get-user/${decoded_token._id}`)
      .then((res) => {
        setUser_Data(res.data);
      });
  }, []);

  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/home"}>
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
        <ul className="flex items-center gap-4 text-slate-700 cursor-pointer font-semibold">
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
          <Link to={"/profile"}>
            {/* <li className="hover:underline">Login</li> */}
            <img
              className="rounded-full h-8 w-8 object-cover"
              src={user_data.photo}
              alt=""
            />
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

// For responsive purposes we can set max with of the screen size
// just add it on the content in the tailwindcss.config.js
