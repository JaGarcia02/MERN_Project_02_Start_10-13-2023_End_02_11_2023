import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">JaCorp</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center  ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64" // <--- this can be responsive to modify the size of the textbox
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 text-slate-700 cursor-pointer font-semibold">
          <Link to={"/"}>
            <li
              className="hidden sm:inline hover:underline" // this will hide the home list if the screen size is small
            >
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to={"/sign-in"}>
            <li className="hover:underline">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

// For responsive purposes we can set max with of the screen size
// just add it on the content in the tailwindcss.config.js
