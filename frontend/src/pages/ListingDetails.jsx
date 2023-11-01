import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import {
  API_LISTING_URL,
  REQ_METHOD_GET_LISING_DETAILS,
} from "../utils/listing_url";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

const ListingDetails = () => {
  const params = useParams();
  const decoded_token = jwt_decode(Cookie.get("user_token"));
  const [contact, setContact] = useState(false);
  const [listing, setListing] = useState({
    data: [],
    error: false,
    message: "",
    loading: false,
    copied: false,
  });
  useEffect(() => {
    axios
      .get(
        API_LISTING_URL +
          REQ_METHOD_GET_LISING_DETAILS +
          `${params.listingId}/` +
          decoded_token._id
      )
      .then((res) => {
        setListing({ ...listing, loading: true });
        setTimeout(() => {
          setListing({ ...listing, data: res.data, loading: false });
        }, 2000);
      })
      .catch((error) => {
        setListing({ ...listing, error: true, message: error });
      });
  }, []);

  return (
    <>
      <Header />
      <main className="">
        {listing.loading === true && listing.data.length == 0 && (
          //
          <p className="text-center my-7 text-2xl flex justify-center items-center font-semibold">
            Loading Please Wait . . .
            <AiOutlineLoading3Quarters className="my-7 text-3xl animate-spin ml-2" />
          </p>
        )}

        {listing.loading === false && listing.data.length !== 0 ? (
          //
          <>
            <>
              <Swiper navigation>
                {listing?.data?.imageURLs?.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[450px]"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                <FaShare
                  className="text-slate-500"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                />
              </div>
              {listing.copied === true && (
                <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                  Link copied!
                </p>
              )}
              <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                <p className="text-2xl font-semibold">
                  {listing?.data?.name} - ${" "}
                  {listing?.data?.offer
                    ? listing?.data?.discountedPrice
                    : listing?.data?.regularPrice}
                  {listing.data.type === "rent" && "/ month"}
                </p>
                <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                  <FaMapMarkerAlt className="text-green-700" />
                  {listing?.data?.address}
                </p>
                <div className="flex gap-4">
                  <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    {listing.type === "rent" ? "For Rent" : "For Sale"}
                  </p>
                  {listing.data.offer && (
                    <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                      $
                      {" " +
                        listing?.data?.regularPrice -
                        +listing?.data?.discountedPrice}{" "}
                      OFF
                    </p>
                  )}
                </div>
                <p className="text-slate-800">
                  <span className="font-semibold text-black">
                    Description -{" "}
                  </span>
                  {listing?.data?.description}
                </p>
                <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaBed className="text-lg" />
                    {listing.data.bedrooms > 1
                      ? `${listing?.data?.bedrooms} beds `
                      : `${listing?.data?.bedrooms} bed `}
                  </li>
                  ?
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaBath className="text-lg" />
                    {listing.data.bathrooms > 1
                      ? `${listing?.data?.bathrooms} baths `
                      : `${listing?.data?.bathrooms} bath `}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaParking className="text-lg" />
                    {listing?.data?.parking ? "Parking spot" : "No Parking"}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaChair className="text-lg" />
                    {listing?.data?.furnished ? "Furnished" : "Unfurnished"}
                  </li>
                </ul>
                {decoded_token._id &&
                listing.data.userRef !== decoded_token._id &&
                !contact ? (
                  <>
                    <button
                      onClick={() => setContact(true)}
                      className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                    >
                      Contact landlord
                    </button>
                  </>
                ) : (
                  ""
                )}
                {contact && <Contact listing={listing} />}
              </div>
            </>
          </>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default ListingDetails;
