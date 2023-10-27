import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import { check_token } from "../redux/features/auth/auth_slice";
import Error_403 from "../pages/Error/Error_403";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = {
    token: Cookie.get("user_token"),
  };
  const [user_token, setUser_Token] = useState("");

  useEffect(() => {
    const LocalStorage_Token = {
      token: localStorage.getItem("user_token"),
    };

    // if (JSON.stringify(Cookie.get("user_token")) === LocalStorage_Token.token) {
    //   setUser_Token(Cookie.get("user_token"));
    // }

    switch (
      JSON.stringify(Cookie.get("user_token")) === LocalStorage_Token.token
    ) {
      case true: {
        setUser_Token(Cookie.get("user_token"));
        break;
      }
    }

    // switch (LocalStorage_Token) {
    //   case true: {
    //     if (
    //       JSON.stringify(Cookie.get("user_token")) === LocalStorage_Token.token
    //     ) {
    //       setUser_Token(Cookie.get("user_token"));
    //     }
    //     break;
    //   }
    //   case true: {
    //     if (
    //       JSON.stringify(Cookie.get("user_token")) !== LocalStorage_Token.token
    //     ) {
    //       navigate("/");
    //     }
    //     break;
    //   }
    // }
  }, [user_token]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(check_token(token));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return user_token == null ? <Error_403 /> : <Outlet />;
};

export default PrivateRoute;
