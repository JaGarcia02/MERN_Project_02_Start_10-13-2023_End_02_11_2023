import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_USER_URL, REQ_METHOD_GET_USER } from "../utils/user_url";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(API_USER_URL, REQ_METHOD_GET_USER + listing.data.userRef)
      .then((res) => {
        setLandlord(res.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [listing.data.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">
              {listing.data.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.data.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
