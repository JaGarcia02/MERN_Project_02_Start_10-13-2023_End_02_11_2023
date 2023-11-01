import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase/google_firebase";
import { AiOutlineLoading3Quarters, AiFillPicture } from "react-icons/ai";
import { ImFolderUpload } from "react-icons/im";
import { BiSolidSave } from "react-icons/bi";
import { FaBuildingUser } from "react-icons/fa6";

import {
  FcRemoveImage,
  FcAddImage,
  FcEditImage,
  FcUpload,
} from "react-icons/fc";
import axios from "axios";
import { API_USER_URL, REQ_METHOD_GET_USER } from "../utils/user_url";
import { API_LISTING_URL, REQ_METHOD_GET_LISTING } from "../utils/listing_url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_user,
  reset_user,
  update_profile,
  update_profile_picture,
} from "../redux/features/user/user_slice";
import { logout_user, reset } from "../redux/features/auth/auth_slice";
import ShowListingModal from "../components/Listing/ShowListingModal";
import NoImage from "../assets/RealEstate_Images/no_image.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const decoded_token = jwt_decode(Cookie.get("user_token"));
  const [file, setFile] = useState(undefined);
  const [trigger_button, setTrigger_Button] = useState(false);
  const [toggle_disable, setToggle_Disable] = useState(false);
  const [disable_update, setDisable_Update] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [loading_animation, setLoading_Animation] = useState(false);
  const [triggerPercentage, setTriggerPercentage] = useState(false);
  const [logout_disable, setLogout_Disable] = useState(false);
  const [messagePercentage, setMessagePercentage] = useState("");
  const [form_input, setForm_Input] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });
  const [user_data, setUser_Data] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });
  const [listing, setListing] = useState({
    open: false,
    data: [],
    error: false,
    message: "",
    disabled: false,
  });
  const {
    User,
    isLoadingUser_Delete,
    isSuccessUser_Delete,
    isErrorUserUser_Delete,
    responseMessage_Delete,
    response_Delete,
    isLoadingUser_UpdateProfileDetails,
    isSuccessUser_UpdateProfileDetails,
    isErrorUser_UpdateProfileDetails,
    responseMessage_UpdateProfileDetails,
    response_UpdateProfileDetails,
    isLoadingUser_UpdateProfilePicture,
    isSuccessUser_UpdateProfilePicture,
    isErrorUser_UpdateProfilePicture,
    responseMessage_UpdateProfilePicture,
    response_UpdateProfilePicture,
  } = useSelector((state) => state.User);

  // ******************************************************************************************** Notification ******************************************************************************************** //
  // ******************************************************************************************** Notification ******************************************************************************************** //
  // ******************************************************************************************** Notification ******************************************************************************************** //
  // ******************************************************************************************** Notification ******************************************************************************************** //

  // notfication tostify
  const notify_success = () => {
    toast.info("Account Successfully Removed!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_success_update_profileDetails = () => {
    toast.info("Account Details Updated!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_success_remove_picture = () => {
    toast.success("Profile Picture Successfully Removed!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_error = () => {
    toast.error(" Something went wrong, Please try again!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  // ******************************************************************************************** Notification ******************************************************************************************** //
  // ******************************************************************************************** Notification ******************************************************************************************** //
  // ******************************************************************************************** Notification ******************************************************************************************** //
  // ******************************************************************************************** Notification ******************************************************************************************** //

  // ******************************************************************************************** useEffects ******************************************************************************************** //
  // ******************************************************************************************** useEffects ******************************************************************************************** //
  // ******************************************************************************************** useEffects ******************************************************************************************** //
  // ******************************************************************************************** useEffects ******************************************************************************************** //

  useEffect(() => {
    if (form_input.username || form_input.email || form_input.password) {
      setDisable_Update(false);
    } else {
      setDisable_Update(true);
    }

    axios
      .get(API_USER_URL + REQ_METHOD_GET_USER + decoded_token._id)
      .then((res) => {
        setUser_Data({
          ...user_data,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          photo: res.data.photo,
        });
      });
    if (file) {
      handleFileUpload(file);
    }

    setFile(undefined);
  }, [file, form_input]);

  useState(() => {
    if (isLoadingUser_Delete) {
      setLoading_Animation(true);
    }

    dispatch(reset_user());
  }, [
    User,
    isLoadingUser_Delete,
    isSuccessUser_Delete,
    isErrorUserUser_Delete,
    responseMessage_Delete,
    response_Delete,
  ]);

  useEffect(() => {
    if (isLoadingUser_UpdateProfileDetails) {
      setLoading_Animation(true);
    }

    if (isLoadingUser_UpdateProfilePicture) {
      setLoading_Animation(true);
    }

    if (isSuccessUser_UpdateProfileDetails) {
      setUser_Data({
        ...user_data,
        username: response_UpdateProfileDetails.data.username,
        email: response_UpdateProfileDetails.data.email,
        password: response_UpdateProfileDetails.data.password,
      });
    }

    if (isSuccessUser_UpdateProfilePicture) {
      setUser_Data({
        ...user_data,
        photo: response_UpdateProfilePicture?.data?.photo,
      });
    }

    setTimeout(() => {
      setLoading_Animation(false);
    }, 3000);

    dispatch(reset_user());
  }, [
    isLoadingUser_UpdateProfileDetails,
    isSuccessUser_UpdateProfileDetails,
    isErrorUser_UpdateProfileDetails,
    responseMessage_UpdateProfileDetails,
    response_UpdateProfileDetails,
    isLoadingUser_UpdateProfilePicture,
    isSuccessUser_UpdateProfilePicture,
    isErrorUser_UpdateProfilePicture,
    responseMessage_UpdateProfilePicture,
    response_UpdateProfilePicture,
  ]);

  useEffect(() => {
    if (uploadPercentage != 0 && uploadPercentage != 100) {
      setTriggerPercentage(true);
    } else {
      setTriggerPercentage(false);
    }
    if (uploadPercentage === 100) {
      setTrigger_Button(false);
      setMessagePercentage(" Image successfully uploaded!");
      setTimeout(() => {
        setMessagePercentage("");
      }, 5000);
    }
  }, [uploadPercentage]);

  useEffect(() => {
    axios
      .get(API_LISTING_URL + REQ_METHOD_GET_LISTING + decoded_token._id)
      .then((res) => {
        setListing({ ...listing, data: res.data });
      })
      .catch((error) => {
        setListing({ ...listing, error: true, message: error });
      });
  }, []);

  // ******************************************************************************************** useEffects ******************************************************************************************** //
  // ******************************************************************************************** useEffects ******************************************************************************************** //
  // ******************************************************************************************** useEffects ******************************************************************************************** //
  // ******************************************************************************************** useEffects ******************************************************************************************** //

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploadPercentage("");
    setUploadError(false);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },

      (error) => {
        setUploadError(true);
        setUser_Data("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downlodURL) => {
          setForm_Input({ ...form_input, photo: downlodURL });
          setUser_Data({ ...user_data, photo: downlodURL });
          const picture_data = {
            _id: decoded_token._id,
            photo: downlodURL,
          };
          dispatch(update_profile_picture(picture_data));
        });
      }
    );
  };

  const UpdateProfile = (e) => {
    e.preventDefault();

    notify_success_update_profileDetails();
    const profile_data = {
      _id: decoded_token._id,
      username: form_input.username,
      email: form_input.email,
      password: form_input.password,
    };
    dispatch(update_profile(profile_data));
    setForm_Input({
      ...form_input,
      username: "",
      email: "",
      password: "",
      photo: "",
    });
  };

  const RemoveProfilePicture = (e) => {
    e.preventDefault();

    const profile_data = {
      _id: decoded_token._id,
      photo:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };
    if (
      confirm("Please confirm for deleting this account.\nJaCorpEstate") == true
    ) {
      notify_success_remove_picture();
      dispatch(update_profile(profile_data));
    } else {
      notify_error();
    }
  };

  const DeleteAccount = () => {
    const id = decoded_token._id;
    if (
      confirm("Please confirm for deleting this account.\nJaCorpEstate") == true
    ) {
      notify_success();
      setTimeout(() => {
        dispatch(delete_user(id));
        setLoading_Animation(isLoadingUser_Delete);
        navigate("/");
        window.location.reload();
      }, 3000);
    } else {
      notify_error();
    }
  };

  const LogOutAccount = () => {
    setLogout_Disable(true);
    setToggle_Disable(true);
    setTimeout(() => {
      dispatch(logout_user());
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="p-3 max-w-lg mx-auto over">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={UpdateProfile} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
          />
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            src={user_data.photo || NoImage}
            alt=""
            onClick={() => {
              toggle_disable === true
                ? setTrigger_Button(false)
                : trigger_button
                ? setTrigger_Button(false)
                : setTrigger_Button(true);
            }}
          />
          <div className="flex justify-center items-center">
            {uploadError ? (
              <>
                <span className="text-red-700">
                  Image upload failed! (image must be less than 2 mb)
                </span>
              </>
            ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
              <>
                <span className="text-slate-700">{`Uploading ${uploadPercentage}%`}</span>
              </>
            ) : uploadPercentage === 100 && uploadError === false ? (
              <>
                <span className="text-green-700 font-bold">
                  {messagePercentage}
                </span>
              </>
            ) : (
              ""
            )}
          </div>
          {trigger_button ? (
            // Make this responsive //
            <div className="w-full">
              <div className="flex justify-between items-center p-3">
                <button
                  disabled={triggerPercentage ? true : false}
                  onClick={(e) => {
                    e.preventDefault();
                    fileRef.current.click();
                  }}
                  className={`font-bold text-sm bg-yellow-500 uppercase text-white h-[35px] w-[180px] rounded-md hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-in-out hover:rounded-full}`}
                >
                  <div className="flex justify-center items-center">
                    <FcAddImage className="mr-2 text-[20px] " />
                    <p className="">Upload Picture</p>
                  </div>
                </button>
                <button
                  disabled={triggerPercentage ? true : false}
                  onClick={RemoveProfilePicture}
                  className="font-bold text-sm bg-red-500 uppercase text-white h-[35px] w-[180px] rounded-md hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-in-out"
                >
                  <div className="flex justify-center items-center">
                    <FcRemoveImage className="mr-2 text-[20px]" />
                    <span>Remove Picture</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            name=""
            id=""
            minlength={6}
            className="border-[2px] p-3 rounded-lg focus:outline-none"
            placeholder="username"
            disabled={logout_disable ? true : false}
            value={form_input.username}
            onChange={(e) => {
              setForm_Input({ ...form_input, username: e.target.value });
            }}
          />
          <input
            type="email"
            name=""
            id=""
            className="border-[2px] p-3 rounded-lg focus:outline-none"
            placeholder="email"
            disabled={logout_disable ? true : false}
            value={form_input.email}
            onChange={(e) => {
              setForm_Input({ ...form_input, email: e.target.value });
            }}
          />
          <input
            type="password"
            name=""
            id=""
            minlength={12}
            className="border-[2px] p-3 rounded-lg focus:outline-none"
            placeholder="password"
            disabled={logout_disable ? true : false}
            value={form_input.password}
            onChange={(e) => {
              setForm_Input({ ...form_input, password: e.target.value });
            }}
          />
          <button
            type="submit"
            disabled={logout_disable || disable_update ? true : false}
            className="bg-slate-700 text-center flex justify-center items-center text-white font-bold rounded-lg p-3 uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed h-[45px] transition-all duration-500 ease-in-out "
          >
            {loading_animation ? (
              <>
                <div className="flex justify-center items-center text-[20px]">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
              </>
            ) : (
              <>
                <BiSolidSave className="text-[24px]" />
                <span className="ml-2">Update</span>
              </>
            )}
          </button>
          {logout_disable === true ? (
            <>
              <button
                disabled={logout_disable || disable_update ? true : false}
                className="bg-blue-800 text-center flex justify-center items-center text-white font-bold rounded-lg p-3 uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed h-[45px] transition-all duration-500 ease-in-out "
              >
                <FaBuildingUser className="text-[24px]" />
                <span className="ml-2">Listing</span>
              </button>
            </>
          ) : (
            <>
              <Link
                className="bg-blue-800 text-white flex justify-center items-center font-bold text-center rounded-lg p-3 uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed h-[45px] transition-all duration-500 ease-in-out "
                to={"/listing"}
              >
                <FaBuildingUser className="text-[24px]" />
                <span className="ml-2">Listing</span>
              </Link>
            </>
          )}
        </form>
        <div className="flex justify-between mt-5 font-bold">
          <button
            className="text-red-700 cursor-pointer hover:text-red-500 hover:underline disabled:no-underline transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
            disabled={toggle_disable}
            onClick={DeleteAccount}
          >
            <span className="disabled:cursor-not-allowed">Delete Account</span>
          </button>
          <button
            className="text-red-700 cursor-pointer hover:text-red-500 hover:underline disabled:no-underline transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
            disabled={toggle_disable}
            onClick={LogOutAccount}
          >
            <span className="disabled:cursor-not-allowed">Sign Out</span>
          </button>
        </div>

        <div className="mt-[1rem] w-full text-center flex flex-col justify-center items-center"></div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
