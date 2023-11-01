import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import {
  API_LISTING_URL,
  REQ_METHOD_DELETE_LISTING,
  REQ_METHOD_GET_LISTING,
} from "../utils/listing_url";
import { useNavigate, Link } from "react-router-dom";
import { FcAddDatabase, FcEmptyTrash, FcFile } from "react-icons/fc";

const Listing = () => {
  const navigate = useNavigate();
  const decoded_token = jwt_decode(Cookie.get("user_token"));
  const [listing, setListing] = useState({
    open: false,
    data: [],
    error: false,
    message: "",
    disabled: false,
  });

  useState(() => {
    axios
      .get(API_LISTING_URL + REQ_METHOD_GET_LISTING + decoded_token._id)
      .then((res) => {
        setListing({ ...listing, data: res.data });
      })
      .catch((error) => {
        setListing({ ...listing, error: true, message: error });
      });
  }, []);

  const DeleteLising = (id) => {
    axios
      .delete(
        API_LISTING_URL +
          REQ_METHOD_DELETE_LISTING +
          `${id}/` +
          decoded_token._id
      )
      .then((res) => {
        setListing({ ...listing, data: res.data.payload });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="p-3 max-w-lg mx-auto ">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7 ">
            <p className="text-[20px] mr"> </p>
            Your Listings
          </h1>
        </div>

        {/* Button */}

        <div className="flex justify-between items-center p-3 w-full border-[1px] border-gray-400">
          <div className="flex justify-center items-center">
            <Link
              to={"/create-listing"}
              className={`border-[2px] border-green-700 w-[50px] h-[50px] text-[2rem] flex justify-center items-center rounded-full text-white p-3 text-center hover:opacity-75 font-bold uppercase transition-all duration-100 ease-in-out hover:bg-green-100 `}
            >
              <FcAddDatabase />
            </Link>
          </div>

          <div className="flex flex-col items-end justify-end">
            <span>{decoded_token.username}</span>
            <span className="font-semibold">Total: {listing.data.length}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4  mt-[15px]">
          <>
            {listing.data.map((data) => {
              return (
                <div
                  key={data._id}
                  className="border-[1px] border-gray-400 rounded-lgnde p-3 flex justify-between items-center gap-4"
                >
                  <Link to={`/listing/${data._id}`}>
                    <img
                      src={data.imageURLs[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                  <Link
                    to={`/listing/${data._id}`}
                    className="flex-1 text-slate-700 font-semibold  hover:underline truncate"
                  >
                    <p>{data.name}</p>
                  </Link>

                  <div className="flex flex-col justify-center items-center w-[50px]">
                    <button
                      onClick={() => DeleteLising(data._id)}
                      className="border-[2px] border-red-500 h-[35px] w-[35px] rounded-full mb-2 text-white font-bold uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed  transition-all duration-100 ease-in-out hover:bg-red-100"
                    >
                      <span className="w-full flex justify-center items-center">
                        <FcEmptyTrash />
                      </span>
                    </button>
                    <Link
                      to={`/update-listing/${data._id}/${decoded_token._id}`}
                      className="border-[2px] border-orange-500 flex justify-center items-center h-[35px] w-[35px] text-white text-center font-bold rounded-full uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100 ease-in-out hover:bg-yellow-100"
                    >
                      <span className="">
                        <FcFile />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </>
        </div>
      </div>
    </>
  );
};

export default Listing;
