import Test from "../models/test_model.js";
import fs from "fs";

export const UploadImageLocal = async (req, res) => {
  try {
    fs.rename(
      `./storage/test_pictures/${req.file.filename}`,
      `./storage/test_pictures/${req.file.filename}.png`,
      (error) => {
        return error;
      }
    );
    await Test.create({
      image_path: `/storage/test_pictures/${req.file.filename}.png`,
    });
    const new_images_path = await Test.find({});
    return res.status(201).json(new_images_path);
  } catch (error) {
    throw new Error(error);
  }
};

export const GetImage = async (req, res) => {
  try {
    const images = await Test.find({});
    return res.status(200).json(images);
  } catch (error) {
    throw new Error(error);
  }
};
