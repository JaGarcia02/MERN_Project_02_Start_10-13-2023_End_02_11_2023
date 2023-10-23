import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import UserRoutetr from "./routes/user_route.js";
import AuthRouter from "./routes/auth_route.js";
import ListingRouter from "./routes/listing_route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: "*", withCredentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", UserRoutetr);
app.use("/api/auth", AuthRouter);
app.use("/api/listing", ListingRouter);

// Local Storage
try {
  if (!fs.existsSync("storage")) {
    fs.mkdirSync("storage");
  }
  if (!fs.existsSync("./storage/profile_pictures")) {
    fs.mkdirSync("./storage/profile_pictures");
  }
  if (!fs.existsSync("./storage/unit_pictures")) {
    fs.mkdirSync("./storage/unit_pictures");
  }
} catch (error) {
  console.log(error);
}

// Mongo Database
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Database: Connected");
      console.log(`Server Port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
