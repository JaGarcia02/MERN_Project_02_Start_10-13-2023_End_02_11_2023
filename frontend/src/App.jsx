import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import HeaderPublic from "./components/HeaderPublic";
import { useDispatch, useSelector } from "react-redux";
import { check_token } from "./redux/features/auth/auth_slice";

function App() {
  return (
    <>
      <div className="App">
        {/* <Header /> : <HeaderPublic /> */}
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Private Route */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
