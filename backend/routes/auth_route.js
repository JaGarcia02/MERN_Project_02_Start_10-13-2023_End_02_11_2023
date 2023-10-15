import express from "express";
import { SignUp, SignIn, GetToken } from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/check-token", GetToken);

export default router;
