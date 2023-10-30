import axios from "axios";
import React, { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import {
  API_LISTING_URL,
  REQ_METHOD_DELETE_LISTING,
  REQ_METHOD_GET_LISTING,
} from "../../utils/listing_url";

const ShowListingModal = ({ listing, setListing }) => {
  const decoded_token = jwt_decode(Cookie.get("user_token"));

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
      <div className="w-screen h-screen absolute top-0 left-0 z-[999] bg-black/50 overflow-hidden flex justify-center items-center">
        <div className="h-[750px] w-[750px] bg-gray-100 rounded-md">
          {/* Top Header Modal */}
          <div className="flex justify-between items-center bg-slate-300 h-[40px] p-3">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">JaCorp</span>
              <span className="text-slate-700">Estate</span>
            </h1>
            <button
              onClick={() => setListing({ ...listing, open: false })}
              className="text-red-700 hover:opacity-75 transition-all duration-200 "
            >
              <FaTimesCircle className="h-[25px] w-[25px] mr-1 mt-1" />
            </button>
          </div>

          <div className="text-center text-[1.5rem] font-bold mt-5">
            <h1>Your Listings</h1>
          </div>
          {/* Top Header Modal */}

          {/* Listing Data */}
          <div className="flex flex-col gap-4 p-5 mt-[10px]">
            <>
              {listing.data.map((data) => {
                return (
                  <div
                    key={data._id}
                    className="border-[1.5px] border-slate-300 rounded-lgnde p-3 flex justify-between items-center gap-4"
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

                    <div className="flex flex-col w-[100px]">
                      <button
                        onClick={() => DeleteLising(data._id)}
                        className="bg-red-700 h-[25px] mb-2 text-white font-bold rounded-md uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed  transition-all duration-500 ease-in-out "
                      >
                        Delete
                      </button>
                      <Link
                        to={`/update-listing/${data._id}/${decoded_token._id}`}
                        className="bg-orange-500 h-[25px] text-white text-center font-bold rounded-md uppercase hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed  transition-all duration-500 ease-in-out "
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowListingModal;
