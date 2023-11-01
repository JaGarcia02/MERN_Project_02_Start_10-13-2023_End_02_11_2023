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

const ListingDetails = () => {
  const params = useParams();
  const decoded_token = jwt_decode(Cookie.get("user_token"));
  const [listing, setListing] = useState({
    data: [],
    error: false,
    message: "",
    loading: false,
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
        setListing({ ...listing, data: res.data });
      })
      .catch((error) => {
        setListing({ ...listing, error: true });
      });
  }, []);

  console.log();
  return (
    <>
      <Header />
      <main className="">
        {listing.loading === true && (
          <AiOutlineLoading3Quarters className="my-7 text-3xl animate-spin" />
        )}
        {listing.loading === false && listing.error === false && (
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
          </>
        )}
      </main>
    </>
  );
};

export default ListingDetails;
