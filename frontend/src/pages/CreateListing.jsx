import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../components/Header";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/google_firebase";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  API_LISTING_URL,
  REQ_METHOD_CREATE_LISTING,
} from "../utils/listing_url";

const CreateListing = () => {
  const decoded_token = jwt_decode(Cookie.get("user_token"));
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ imageUrls: [] });
  const [loading_animation, setLoading_Animation] = useState(false);
  const [disable_button, setDisable_Button] = useState({
    update: false,
    create_listing: false,
  });
  const [uploadError, setUploadError] = useState(false);
  const [input_data, setInput_Data] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    discountedPrice: 0,
    bathRooms: 1,
    bedRooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
    userRef: "",
    sell: false,
    rent: false,
  });

  const notify_success = () => {
    toast.success("Listing Created Successful!", {
      position: "bottom-left",
      hideProgressBar: false,
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          if (progress === 100) {
            setLoading_Animation(false);
          }
        },
        (error) => {
          setUploadError(true);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const UploadImages = (e) => {
    if (formData.imageUrls.length === 6) {
      setDisable_Button({ ...disable_button, update: true });
    }
    if (files.length == 0) {
      setUploadError(`No image selected!`);
      setTimeout(() => {
        setUploadError(null);
      }, 5000);
    } else if (
      files.length > 0 &&
      files.length + formData.imageUrls.length < 7
    ) {
      setLoading_Animation(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploadError(false);
        })
        .catch((error) => {
          setUploadError(
            `Image size must be at least 2mb, Upload failed! / ${error} `
          );
          setTimeout(() => {
            setUploadError(null);
          }, 5000);
        });
    } else {
      setUploadError(`Upload limit exceded, you can only upload 6 images.`);
      setTimeout(() => {
        setUploadError(null);
      }, 5000);
    }
  };

  const RemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const CreateListing = (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0) {
      alert("please upload image!");
    } else if (input_data.regularPrice < input_data.discountedPrice) {
      alert("Discount price must be lower than regular price!");
    } else {
      axios
        .post(API_LISTING_URL + REQ_METHOD_CREATE_LISTING, {
          name: input_data.name,
          description: input_data.description,
          address: input_data.address,
          regularPrice: input_data.regularPrice,
          discountedPrice: input_data.discountedPrice,
          bathRooms: input_data.bathRooms,
          bedRooms: input_data.bedRooms,
          furnished: input_data.furnished,
          parking: input_data.parking,
          type: input_data.type,
          offer: input_data.offer,
          imageURLs: formData.imageUrls,
          userRef: decoded_token._id,
        })
        .then((res) => {
          notify_success();
          setFormData({ ...formData, imageUrls: "" });
          setDisable_Button({ ...disable_button, create_listing: true });
          setTimeout(() => {
            setDisable_Button({ ...disable_button, update: false });
            setDisable_Button({ ...disable_button, create_listing: false });
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          alert("Error!");
        });
    }
  };

  return (
    <>
      <Header />
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-7">
          Create a Listing
        </h1>
        <form
          onSubmit={CreateListing}
          className="flex flex-col sm:flex-row gap-4"
          encType="multipart/form-data"
        >
          {/* Left */}
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              name=""
              id="name"
              placeholder="Name"
              className="border p-3 rounded-lg focus:outline-none"
              maxLength={62}
              minLength={10}
              required
              onChange={(e) =>
                setInput_Data({ ...input_data, name: e.target.value })
              }
              value={input_data.name}
            />
            <textarea
              type="text"
              name=""
              id="description"
              placeholder="Description"
              className="border p-3 rounded-lg focus:outline-none resize-none h-[8rem] text-left"
              maxLength={1000}
              required
              onChange={(e) =>
                setInput_Data({ ...input_data, description: e.target.value })
              }
              value={input_data.description}
            />

            <input
              type="text"
              name=""
              id="address"
              placeholder="Address"
              className="border p-3 rounded-lg focus:outline-none"
              required
              onChange={(e) =>
                setInput_Data({ ...input_data, address: e.target.value })
              }
              value={input_data.address}
            />
            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="sell"
                  id="sell"
                  className="w-5"
                  checked={input_data.type === "sell"}
                  onClick={() => {
                    setInput_Data({ ...input_data, type: "sell" });
                  }}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="rent"
                  id="rent"
                  className="w-5"
                  checked={input_data.type === "rent"}
                  onClick={() => {
                    setInput_Data({ ...input_data, type: "rent" });
                  }}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="w-5"
                  checked={input_data.parking === true}
                  onClick={() => {
                    {
                      input_data.parking === false
                        ? setInput_Data({ ...input_data, parking: true })
                        : setInput_Data({ ...input_data, parking: false });
                    }
                  }}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-5"
                  checked={input_data.furnished === true}
                  onClick={() => {
                    {
                      input_data.furnished === false
                        ? setInput_Data({ ...input_data, furnished: true })
                        : setInput_Data({ ...input_data, furnished: false });
                    }
                  }}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-5"
                  checked={input_data.offer === true}
                  onClick={() => {
                    {
                      input_data.offer === false
                        ? setInput_Data({ ...input_data, offer: true })
                        : setInput_Data({ ...input_data, offer: false });
                    }
                  }}
                />
                <span>Offer</span>
              </div>
            </div>
            {/* Bed rooms and Bath rooms */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedroom"
                  name="bedroom"
                  min={1}
                  max={10}
                  value={input_data.bedRooms}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={(e) => {
                    setInput_Data({ ...input_data, bedRooms: e.target.value });
                  }}
                />
                <span>Bedroom</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathroom"
                  name="bathroom"
                  min={1}
                  max={10}
                  value={input_data.bathRooms}
                  required
                  onChange={(e) => {
                    setInput_Data({ ...input_data, bathRooms: e.target.value });
                  }}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <span>Bathroom</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularprice"
                  name="regularprice"
                  min={10}
                  max={100000000}
                  value={input_data.regularPrice}
                  required
                  onChange={(e) => {
                    setInput_Data({
                      ...input_data,
                      regularPrice: e.target.value,
                    });
                  }}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p className="">Regular Price</p>
                  {input_data.type === "rent" ? (
                    <span className="text-xs">($ / month)</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {input_data.offer ? (
                <>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="discountedprice"
                      name="discountedprice"
                      min={0}
                      max={100000000}
                      value={input_data.discountedPrice}
                      required
                      onChange={(e) => {
                        setInput_Data({
                          ...input_data,
                          discountedPrice: e.target.value,
                        });
                      }}
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                    <div className="flex flex-col items-center">
                      <p className="">Discounted Price</p>
                      {input_data.type === "rent" ? (
                        <span className="text-xs">($ / month)</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                name="images"
                id="images"
                accept="images/*"
                multiple
                disabled={loading_animation ? true : false}
                className="p-3 border border-gray-300 rounded w-full"
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                disabled={
                  loading_animation || disable_button.update ? true : false
                }
                type="button"
                onClick={UploadImages}
                className={`p-3 text-green-700 border-[2px] border-green-700 font-semibold rounded uppercase hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading_animation ? "bg-green-700 opacity-50 w-[7rem]" : ""
                }`}
              >
                {loading_animation ? (
                  <>
                    <div className="flex justify-center items-center text-[20px] text-white">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </div>
                  </>
                ) : (
                  <>
                    <span>Upload</span>
                  </>
                )}
              </button>
            </div>
            <div
              className={`w-full ${
                formData.imageUrls.length > 0 ? "h-[25px]" : ""
              } ] flex justify-center items-center text-[14px] font-bold`}
            >
              <p className="text-red-700">{uploadError && uploadError}</p>
            </div>
            <div
              className={` ${
                formData.imageUrls.length > 0
                  ? "h-[21.5rem] overflow-scroll"
                  : ""
              }`}
            >
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <>
                    <div
                      key={url}
                      className="flex justify-between p-3 border items-center "
                    >
                      <img
                        src={url}
                        alt="listing image"
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => RemoveImage(index)}
                        className="p-3 text-white bg-red-700 h-[35px] rounded-lg uppercase hover:opacity-75 transition-all duration-200 disabled:opacity-50 flex justify-center items-center font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ))}
            </div>
            <button
              disabled={disable_button.create_listing ? true : false}
              type="submit"
              className="p-3 bg-slate-700 text-white rounded-lg uppercase transition-all duration-200 hover:opacity-75 disabled:opacity-50"
            >
              {disable_button.create_listing ? (
                <>
                  <div className="flex justify-center items-center text-[20px] text-white">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </div>
                </>
              ) : (
                <>
                  <span> Create Listing</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
      <ToastContainer />
    </>
  );
};

export default CreateListing;
