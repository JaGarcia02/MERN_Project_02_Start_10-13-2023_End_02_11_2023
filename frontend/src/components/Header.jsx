import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { check_token, reset } from "../redux/features/auth/auth_slice";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { reset_user } from "../redux/features/user/user_slice";
import { API_USER_URL, REQ_METHOD_GET_USER } from "../utils/user_url";
import NoImage from "../assets/RealEstate_Images/no_image.jpg";

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
    isLoadingUser_UpdateProfilePicture,
    isSuccessUser_UpdateProfilePicture,
    isErrorUser_UpdateProfilePicture,
    responseMessage_UpdateProfilePicture,
    response_UpdateProfilePicture,
  } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user_data, setUser_Data] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = {
    token: Cookie.get("user_token"),
  };

  // Fetching Data from database
  useEffect(() => {
    const decoded_token = jwt_decode(Cookie.get("user_token"));
    axios
      .get(API_USER_URL + REQ_METHOD_GET_USER + decoded_token._id)
      .then((res) => {
        setUser_Data(res.data);
      });
  }, []);

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
      const decoded_token = jwt_decode(Cookie.get("user_token"));
      axios
        .get(API_USER_URL + REQ_METHOD_GET_USER + decoded_token._id)
        .then((res) => {
          setUser_Data(res.data);
        });
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
      switch (!Cookie.get("user_token")) {
        case true: {
          alert("No Token Found! Plase Signin again.\nSystem Admin");
          Cookie.remove("user_token");
          localStorage.removeItem("user_token");
          navigate("/");
          location.reload();
          break;
        }
        case false: {
          const LocalStorage_Token = {
            token: localStorage.getItem("user_token"),
          };
          if (
            JSON.stringify(Cookie.get("user_token")) !==
            LocalStorage_Token.token
          ) {
            alert(
              "Invalid Token / Token not recognize! Plase Signin again.\nSystem Admin"
            );

            Cookie.remove("user_token");
            localStorage.removeItem("user_token");
            navigate("/");
            location.reload();
            break;
          }
        }
      }

      dispatch(check_token(token));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTerm) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const SubmitSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/home"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">JaCorp</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={SubmitSearch}
          className="bg-slate-100 p-3 rounded-lg flex items-center  "
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64" // <--- this can be responsive to modify the size of the textbox
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex items-center gap-4 text-slate-700 cursor-pointer font-semibold">
          <Link to={"/listing"}>
            <li
              className="hidden sm:inline hover:underline" // this will hide the home list if the screen size is small
            >
              Listing
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to={"/profile"}>
            {/* <li className="hover:underline">Login</li> */}
            <img
              className="rounded-full h-8 w-8 object-cover"
              src={user_data.photo || NoImage}
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
