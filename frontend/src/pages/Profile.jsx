import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import Header from "../components/Header";
import Cookie from "js-cookie";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase/google_firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import {
  API_USER_URL,
  REQ_METHOD_GET,
  REQ_METHOD_UPDATE,
  REQ_METHOD_DELETE,
} from "../utils/user_url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_user,
  reset_user,
  update_profile_picture,
} from "../redux/features/user/user_slice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const decoded_token = jwt_decode(Cookie.get("user_token"));
  const [file, setFile] = useState(undefined);
  const [trigger_button, setTrigger_Button] = useState(false);
  const [trigger_disable, setTrigger_Disable] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [loading_animation, setLoading_Animation] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });
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

  // notfication tostify
  const notify_success = () => {
    toast.success("Account Successfully Removed!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_success_update_picture = () => {
    toast.success("Profile Picture Successfully Updated!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_success_remove_picture = () => {
    toast.success("Profile Picture Successfully Removed!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_success_picture = () => {
    toast.success("Profile Picture Successfully Removed!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 1000,
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

  useEffect(() => {
    axios
      .get(
        // `http://localhost:5555/api/user/get-user/${decoded_token._id}`
        API_USER_URL + REQ_METHOD_GET + decoded_token._id
      )
      .then((res) => {
        setFormData({
          ...formData,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          photo: res.data.photo,
        });
      });
    if (file) {
      handleFileUpload(file);
      setTrigger_Disable(false);
    }
  }, [file]);

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
    if (isSuccessUser_UpdateProfilePicture) {
      setLoading_Animation(true);
    }

    if (isSuccessUser_UpdateProfilePicture) {
      setFormData({
        ...formData,
        username: response_UpdateProfilePicture.data.username,
        email: response_UpdateProfilePicture.data.email,
        password: response_UpdateProfilePicture.data.password,
        photo: response_UpdateProfilePicture.data.photo,
      });
    }

    dispatch(reset_user());
  }, [
    isLoadingUser_UpdateProfilePicture,
    isSuccessUser_UpdateProfilePicture,
    isErrorUser_UpdateProfilePicture,
    responseMessage_UpdateProfilePicture,
    response_UpdateProfilePicture,
  ]);

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
        setFormData("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downlodURL) => {
          setFormData({ ...formData, photo: downlodURL });
        });
      }
    );
  };

  const UpdateProfile = (e) => {
    e.preventDefault();
    const profile_data = {
      _id: decoded_token._id,
      photo: formData.photo,
    };

    if (!file) {
      alert("empty");
    } else {
      notify_success_update_picture();
      dispatch(update_profile_picture(profile_data));
      // axios
      //   .patch(
      //     // `http://localhost:5555/api/user/update-user/${decoded_token._id}`,
      //     API_USER_URL + REQ_METHOD_UPDATE + decoded_token._id,
      //     {
      //       photo: formData.photo,
      //     }
      //   )
      //   .then((res) => {
      //     setFile(undefined);
      //     setTrigger_Disable(true);
      //     window.location.reload();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
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
      dispatch(update_profile_picture(profile_data));
    } else {
      notify_error();
    }
    // axios
    //   .patch(
    //     // `http://localhost:5555/api/user/update-user/${decoded_token._id}`
    //     API_USER_URL + REQ_METHOD_UPDATE + decoded_token._id,
    //     {
    //       photo:
    //         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    //     }
    //   )
    //   .then((res) => {
    //     setTrigger_Disable(true);
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const DeleteAccount = () => {
    const id = decoded_token._id;
    if (
      confirm("Please confirm for deleting this account.\nJaCorpEstate") == true
    ) {
      if (response_Delete.status == 200) {
        notify_success();
        setTimeout(() => {
          dispatch(delete_user(id));
          setLoading_Animation(isLoadingUser_Delete);
          navigate("/");
          window.location.reload();
        }, 2000);
      }
    } else {
      notify_error();
    }
  };

  return (
    <>
      <Header />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form action="" className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
          />
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            src={formData.photo}
            alt="profile"
            onClick={() => {
              trigger_button
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
                <span className="text-green-700">
                  Image successfully uploaded!
                </span>
              </>
            ) : (
              ""
            )}
          </div>
          {trigger_button ? (
            // Make this responsive //
            <div className="flex justify-between items-center w-full">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fileRef.current.click();
                }}
                className="font-bold text-sm bg-orange-500 text-white h-[30px] w-[200px] rounded-md hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-in-out"
              >
                Change Profile Picture
              </button>
              <button
                onClick={RemoveProfilePicture}
                className="font-bold text-sm bg-red-700 text-white h-[30px] w-[200px] rounded-md hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-in-out"
              >
                Remove Profile Picture
              </button>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            name=""
            id=""
            className="border-[2px] p-3 rounded-lg focus:outline-none"
            placeholder="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            type="email"
            name=""
            id=""
            className="border-[2px] p-3 rounded-lg focus:outline-none"
            placeholder="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            name=""
            id=""
            className="border-[2px] p-3 rounded-lg focus:outline-none"
            placeholder="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            disabled={trigger_disable ? true : false}
            onClick={UpdateProfile}
            className="bg-slate-700 text-white font-bold rounded-lg p-3 uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed h-[45px] transition-all duration-500 ease-in-out "
          >
            update
          </button>
        </form>
        <div className="flex justify-between mt-5 font-bold">
          <button onClick={DeleteAccount}>
            <span className="text-red-700 cursor-pointer hover:text-red-500 hover:underline transition-all duration-500 ease-in-out">
              Delete Account
            </span>
          </button>
          <span className="text-red-700 cursor-pointer hover:text-red-500 hover:underline transition-all duration-500 ease-in-out">
            Sign Out
          </span>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
