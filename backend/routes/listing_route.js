import express from "express";
import {
  CreateListing,
  GetUserListing,
  UpdateListing,
  DeleteListing,
  GetLstingDetails,
} from "../controllers/listing_controller.js";

const router = express.Router();

router.get("/get-user-listing/:id", GetUserListing);
router.get("/get-user-listing-detail/:id/:userRef", GetLstingDetails);
router.post("/create-listing", CreateListing);
router.patch("/update-listing/:id/:userRef", UpdateListing);
router.delete("/delete-listing/:id/:userRef", DeleteListing);

export default router;
