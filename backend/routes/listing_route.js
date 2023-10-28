import express from "express";
import {
  CreateListing,
  GetUserListing,
} from "../controllers/listing_controller.js";

const router = express.Router();

router.post("/create-listing", CreateListing);
router.get("/get-user-listing/:id", GetUserListing);

export default router;
