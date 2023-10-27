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

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Test Route */}
          <Route path="/test" element={<SingleImageUploadMulter />} />
          <Route path="/test2" element={<MultipleImageUploadMulter />} />

          {/* Private Route */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
