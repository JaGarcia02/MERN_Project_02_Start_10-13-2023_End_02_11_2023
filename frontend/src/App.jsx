import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import SingleImageUploadMulter from "./pages/Test/SingleImageUploadMulter";
import MultipleImageUploadMulter from "./pages/Test/MultipleImageUploadMulter";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import ListingDetails from "./pages/ListingDetails";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />

          {/* Test Route */}
          <Route path="/test" element={<SingleImageUploadMulter />} />
          <Route path="/test2" element={<MultipleImageUploadMulter />} />

          {/* Private Route */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />

            {/* Listings */}
            <Route path="/listing" element={<Listing />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/listing-details/:listingId"
              element={<ListingDetails />}
            />
            <Route
              path="/update-listing/:listingId/:userId"
              element={<UpdateListing />}
            />

            <Route path="/search" element={<Search />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
