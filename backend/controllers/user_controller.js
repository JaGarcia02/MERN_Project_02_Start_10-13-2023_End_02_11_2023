import User from "../models/user_model.js";
import bcrypt from "bcrypt";

export const test = async (req, res) => {
  await res.json({
    message: "Hello World!",
  });
};

export const GetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user_data = await User.findById({ _id: id });
    return res.status(200).json(user_data);
  } catch (error) {
    throw new Error(error);
  }
};

export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, photo } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(password, salt);

    const user_data = await User.findByIdAndUpdate(
      { _id: id },
      { username: username, email: email, password: passwordHash, photo: photo }
    );

    if (!user_data) {
      return res.status(404).send("No user found");
    }
    const updated_user = await User.findById({ _id: id });
    return res.status(200).json(updated_user);
  } catch (error) {
    throw new Error(error);
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted_user = await User.deleteOne({ _id: id });
    return res.status(200).json(deleted_user);
  } catch (error) {
    throw new Error(error);
  }
};
