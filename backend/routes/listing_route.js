import express from "express";
import { CreateListing } from "../controllers/listing_controller.js";

const router = express.Router();

router.post("/create-listing", CreateListing);

export default router;
