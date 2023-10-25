import express from "express";
import multer from "multer";
import { UploadImageLocal, GetImage } from "../controllers/test_controller.js";

const router = express.Router();
const upload = multer({ dest: "storage/test_pictures" });

router.get("/get-image-local", GetImage);
router.post("/upload-image-local", upload.single("picture"), UploadImageLocal);

export default router;
