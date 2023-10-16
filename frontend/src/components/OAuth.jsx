import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/google_firebase";
import { useDispatch, useSelector } from "react-redux";
import { reset, login_user_google } from "../redux/features/auth/auth_slice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const OAuth = ({
  isloading,
  setIsLoading,
  Auth_Login,
  isLoadingAuth,
  isErrorAuth,
  isSuccessAuth,
  responseMessage,
  response,
  reset,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Signin_With_Google = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const google_data_result = await signInWithPopup(auth, provider);

      const googleUserData = {
        username: google_data_result.user.displayName,
        email: google_data_result.user.email,
        photo: google_data_result.user.photoURL,
      };
      dispatch(login_user_google(googleUserData));
    } catch (error) {
      console.log("Could not signin with google!", error);
    }
  };

  useEffect(() => {
    console.log(response?.data);
    dispatch(reset);
  }, [
    Auth_Login,
    isLoadingAuth,
    isErrorAuth,
    isSuccessAuth,
    responseMessage,
    response,
  ]);
  return (
    <button
      disabled={isloading ? true : false}
      onClick={Signin_With_Google}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
    >
      {isloading == true ? (
        <>
          <div className="flex justify-center items-center text-[20px]">
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        </>
      ) : (
        "Continue with google"
      )}
    </button>
  );
};

export default OAuth;
