import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/google_firebase";
import { useDispatch, useSelector } from "react-redux";
import { reset, login_user_google } from "../redux/features/auth/auth_slice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const [elementState, setElement_State] = useState({
    disable: false,
    animation: false,
  });
  const {
    Auth_User,
    response_Google,
    isLoadingAuth_Google,
    isSuccessAuth_Google,
    isErrorAuth_Google,
    responseMessage_Google,
    isSuccessAuth_Signup,
    response_Signup,
    response_Login,
    isSuccessAuth_Login,
  } = useSelector((state) => state.Auth_User);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Continue_With_Google = async () => {
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
    if (isLoadingAuth_Google) {
      setElement_State({ ...elementState, disable: true, animation: true });
    }

    if (isErrorAuth_Google) {
      setElement_State({ ...elementState, disable: false });
    }

    if (isSuccessAuth_Login) {
      setElement_State({ ...elementState, disable: true });
      setTimeout(() => {
        setElement_State({ ...elementState, disable: false });
      }, 2000);
    }

    if (isSuccessAuth_Signup) {
      setElement_State({ ...elementState, disable: true });
      setTimeout(() => {
        setElement_State({ ...elementState, disable: false });
      }, 2000);
    }

    if (isSuccessAuth_Google) {
      setTimeout(() => {
        setElement_State({ ...elementState, animation: true });
        navigate("/home");
        window.location.reload();
      }, 2000);
    }
  }, [
    Auth_User,
    isLoadingAuth_Google,
    isSuccessAuth_Google,
    isErrorAuth_Google,
    responseMessage_Google,
    response_Google,
    isSuccessAuth_Signup,
    isSuccessAuth_Login,
    response_Signup,
    response_Login,
  ]);

  return (
    <button
      disabled={elementState.disable ? true : false}
      onClick={Continue_With_Google}
      type="button"
      className="bg-red-700 text-white font-bold p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase hover:opacity-75 h-[50px] transition-all duration-500 ease-in-out"
    >
      {elementState.animation === true ? (
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
