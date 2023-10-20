import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import { check_token } from "../redux/features/auth/auth_slice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const token = {
    token: Cookie.get("user_token"),
  };
  const [user_token, setUser_Token] = useState("");
  useEffect(() => {
    const LocalStorage_Token = {
      token: localStorage.getItem("user_token"),
    };

    if (JSON.stringify(Cookie.get("user_token")) === LocalStorage_Token.token) {
      setUser_Token(Cookie.get("user_token"));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(check_token(token));
    }, 2000);
  }, []);

  return user_token != null ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
