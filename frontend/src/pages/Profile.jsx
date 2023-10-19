import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Header from "../components/Header";
import Cookie from "js-cookie";

const Profile = () => {
  const [decoded_token_data, setDecoded_Token_Data] = useState("");
  const { email, password, photo, username } = decoded_token_data;
  useEffect(() => {
    const decoded_token = jwt_decode(Cookie.get("user_token"));
    const LocalStorage_Token = {
      token: localStorage.getItem("user_token"),
    };
    if (JSON.stringify(Cookie.get("user_token")) === LocalStorage_Token.token) {
      setDecoded_Token_Data(decoded_token);
    }
  }, []);
  return (
    <>
      <Header />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form action="" className="flex flex-col gap-4">
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            src={photo}
            alt=""
          />
          <input
            type="text"
            name=""
            id=""
            className="border p-3 rounded-lg"
            placeholder="username"
          />
          <input
            type="email"
            name=""
            id=""
            className="border p-3 rounded-lg"
            placeholder="email"
          />
          <input
            type="password"
            name=""
            id=""
            className="border p-3 rounded-lg"
            placeholder="password"
          />
          <button className="bg-slate-700 text-white font-semibold rounded-lg p-3 uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed h-[45px] transition-all duration-500 ease-in-out ">
            update
          </button>
        </form>
        <div className="flex justify-between mt-5 font-bold">
          <span className="text-red-700 cursor-pointer hover:text-red-500">
            Delete Account
          </span>
          <span className="text-red-700 cursor-pointer hover:text-red-500">
            Sign Out
          </span>
        </div>
      </div>
    </>
  );
};

export default Profile;
