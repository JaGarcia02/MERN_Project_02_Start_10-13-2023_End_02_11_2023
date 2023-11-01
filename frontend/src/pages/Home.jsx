import React from "react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import {
  API_LISTING_URL,
  REQ_METHOD_GET_ALL_LISTING,
} from "../utils/listing_url";
import axios from "axios";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    axios.get(API_LISTING_URL + REQ_METHOD_GET_ALL_LISTING).then((res) => {});
  }, []);
  return (
    <>
      <Header />
      <div>Home</div>
    </>
  );
};

export default Home;
