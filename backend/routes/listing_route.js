import express from "express";
import {
  CreateListing,
  GetUserListing,
  UpdateListing,
  DeleteListing,
} from "../controllers/listing_controller.js";

const router = express.Router();

router.get("/get-user-listing/:id", GetUserListing);
router.post("/create-listing", CreateListing);
router.patch("/update-listing/:id/:userRef", UpdateListing);
router.delete("/delete-listing/:id/:userRef", DeleteListing);

export default router;
