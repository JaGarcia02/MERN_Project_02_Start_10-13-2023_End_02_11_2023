import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import UserRoutetr from "./routes/user_route.js";
import AuthRouter from "./routes/auth_route.js";
import ListingRouter from "./routes/listing_route.js";
import TestRouter from "./routes/test_route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: "*", withCredentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", UserRoutetr);
app.use("/api/auth", AuthRouter);
app.use("/api/listing", ListingRouter);
app.use("/api/test", TestRouter);

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
  if (!fs.existsSync("./storage/test_pictures")) {
    fs.mkdirSync("./storage/test_pictures");
  }
} catch (error) {
  console.log(error);
}

app.use("/storage/unit_pictures", express.static("storage/test_pictures"));
app.use("/storage/test_pictures", express.static("storage/test_pictures"));

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
