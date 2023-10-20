import express from "express";
import { GetUser, UpdateUser } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/get-user/:id", GetUser);
router.patch("/update-user/:id", UpdateUser);

export default router;
