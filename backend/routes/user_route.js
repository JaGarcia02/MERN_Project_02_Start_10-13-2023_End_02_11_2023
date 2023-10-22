import express from "express";
import {
  GetUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/user_controller.js";

const router = express.Router();

router.get("/get-user/:id", GetUser);
router.patch("/update-user/:id", UpdateUser);
router.delete("/delete-user/:id", DeleteUser);

export default router;
