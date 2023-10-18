import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/google_firebase";
import { useDispatch, useSelector } from "react-redux";
import { reset, login_user_google } from "../redux/features/auth/auth_slice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const OAuth = ({ isSuccessAuth, response, isLoading_Signin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { Auth_Login, isLoadingAuth, isErrorAuth, responseMessage } =
    useSelector((state) => state.Auth_Login);

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
      setIsLoading(true);
      dispatch(login_user_google(googleUserData));
    } catch (error) {
      console.log("Could not signin with google!", error);
    }
  };

  useEffect(() => {
    if (isLoading_Signin) {
      setIsLoading(true);
    }

    if (isErrorAuth) {
      setIsLoading(isLoadingAuth);
    }

    if (isSuccessAuth) {
      setTimeout(() => {
        setIsLoading(isLoadingAuth);
        navigate("/home");
      }, 4000);
    }
  }, [
    Auth_Login,
    isLoadingAuth,
    isErrorAuth,
    responseMessage,
    isLoading_Signin,
  ]);

  return (
    <button
      disabled={isLoading ? true : false}
      onClick={Signin_With_Google}
      type="button"
      className="bg-red-700 text-white font-bold p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase hover:opacity-75 h-[50px] transition-all duration-500 ease-in-out"
    >
      {isLoading == true && response?.data.login_method !== "System" ? (
        <>
          <div className="flex justify-center items-center text-[20px]">
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        </>
      ) : (
        <>
          <span>Continue with google</span>
        </>
      )}
    </button>
  );
};

export default OAuth;
