import express from "express";
import {
  GetUser,
  UpdateUser,
  DeleteUser,
  UpdateProfilePicture,
} from "../controllers/user_controller.js";

const router = express.Router();

router.get("/get-user/:id", GetUser);
router.patch("/update-user/:id", UpdateUser);
router.patch("/update-profilepicture/:id", UpdateProfilePicture);
router.delete("/delete-user/:id", DeleteUser);

export default router;
