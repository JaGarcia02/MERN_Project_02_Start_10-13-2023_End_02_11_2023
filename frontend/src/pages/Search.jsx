import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_LISTING_URL, REQ_METHOD_GET_SEARCH } from "../utils/listing_url";
import Header from "../components/Header";
import ListingItem from "../components/Listing/ListingItem";

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const searchQuery = urlParams.toString();

    axios
      .get(API_LISTING_URL + REQ_METHOD_GET_SEARCH + "?" + searchQuery)
      .then((res) => {
        setLoading(true);
        setShowMore(false);

        if (res.data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }

        setTimeout(() => {
          setListings(res.data);
          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    axios
      .get(API_LISTING_URL + REQ_METHOD_GET_SEARCH + "?" + searchQuery)
      .then((res) => {
        if (res.data < 9) {
          setShowMore(false);
        }
        setListings(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row">
        <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
                value={sidebardata.searchTerm}
                onChange={(e) =>
                  setSidebardata({ ...sidebardata, searchTerm: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Type:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={(e) =>
                    setSidebardata({ ...sidebardata, type: "all" })
                  }
                  checked={sidebardata.type === "all"}
                />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={(e) =>
                    setSidebardata({ ...sidebardata, type: "rent" })
                  }
                  checked={sidebardata.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={(e) =>
                    setSidebardata({ ...sidebardata, type: "sale" })
                  }
                  checked={sidebardata.type === "sale"}
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  checked={sidebardata.offer === true}
                  onClick={() => {
                    {
                      sidebardata.parking === false
                        ? setSidebardata({ ...sidebardata, offer: true })
                        : setSidebardata({ ...sidebardata, offer: false });
                    }
                  }}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Amenities:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  checked={sidebardata.parking === true}
                  onClick={() => {
                    {
                      sidebardata.parking === false
                        ? setSidebardata({ ...sidebardata, parking: true })
                        : setSidebardata({ ...sidebardata, parking: false });
                    }
                  }}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  checked={sidebardata.furnished === true}
                  onClick={() => {
                    {
                      sidebardata.furnished === false
                        ? setSidebardata({ ...sidebardata, furnished: true })
                        : setSidebardata({ ...sidebardata, furnished: false });
                    }
                  }}
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select
                onChange={(e) => {
                  const sort = e.target.value.split("_")[0] || "created_at";
                  const order = e.target.value.split("_")[1] || "desc";
                  setSidebardata({ ...sidebardata, sort, order });
                }}
                defaultValue={"created_at_desc"}
                id="sort_order"
                className="border rounded-lg p-3"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to hight</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Search
            </button>
          </form>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
            Listing results:
          </h1>
          <div className="p-7 flex flex-wrap gap-4">
            {!loading && listings.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}
            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}

            {showMore && (
              <button
                onClick={onShowMoreClick}
                className="text-green-700 hover:underline p-7 text-center w-full"
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
