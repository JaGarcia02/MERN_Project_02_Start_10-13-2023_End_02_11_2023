import express from "express";
import {
  SignUp,
  SignIn,
  GetToken,
  SignIn_Google,
  SignOut,
} from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/google-signin", SignIn_Google);
router.get("/signout", SignOut);
router.post("/check-token", GetToken);

export default router;
