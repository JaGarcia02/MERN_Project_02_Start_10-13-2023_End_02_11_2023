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
import axios from "axios";

const Profile = () => {
  const fileRef = useRef(null);
  const decoded_token = jwt_decode(Cookie.get("user_token"));
  const [file, setFile] = useState(undefined);
  const [trigger_button, setTrigger_Button] = useState(false);
  const [trigger_disable, setTrigger_Disable] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5555/api/user/get-user/${decoded_token._id}`)
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
    if (!file) {
      alert("empty");
    } else {
      axios
        .patch(
          `http://localhost:5555/api/user/update-user/${decoded_token._id}`,
          {
            photo: formData.photo,
          }
        )
        .then((res) => {
          setFile(undefined);
          setTrigger_Disable(true);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
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
              <button className="font-bold text-sm bg-red-700 text-white h-[30px] w-[200px] rounded-md hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-in-out">
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
            placeholder={formData.username}
          />
          <input
            type="email"
            name=""
            id=""
            className="border-[2px] p-3 rounded-lg focus:outline-none"
            placeholder={formData.email}
          />
          <input
            type="password"
            name=""
            id=""
            className="border-[2px] p-3 rounded-lg focus:outline-none"
            placeholder="password"
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
          <span className="text-red-700 cursor-pointer hover:text-red-500 hover:underline transition-all duration-500 ease-in-out">
            Delete Account
          </span>
          <span className="text-red-700 cursor-pointer hover:text-red-500 hover:underline transition-all duration-500 ease-in-out">
            Sign Out
          </span>
        </div>
      </div>
    </>
  );
};

export default Profile;
