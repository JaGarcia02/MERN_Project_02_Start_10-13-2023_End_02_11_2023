import User from "../models/user_model.js";
import bcrypt from "bcrypt";

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
  const { username, email, password } = req.body;
  try {
    if (username) {
      await User.findByIdAndUpdate(
        { _id: id },
        {
          username: username,
        }
      );
      const updated_user = await User.findById({ _id: id });
      return res.status(200).json(updated_user);
    } else if (email) {
      await User.findByIdAndUpdate(
        { _id: id },
        {
          email: email,
        }
      );
      const updated_user = await User.findById({ _id: id });
      return res.status(200).json(updated_user);
    } else if (password) {
      const salt = await bcrypt.genSaltSync(10);
      const passwordHash = await bcrypt.hashSync(password, salt);
      await User.findByIdAndUpdate(
        { _id: id },
        {
          password: passwordHash,
        }
      );
      const updated_user = await User.findById({ _id: id });
      return res.status(200).json(updated_user);
    }
    if (username && email && password) {
      const salt = await bcrypt.genSaltSync(10);
      const passwordHash = await bcrypt.hashSync(password, salt);
      await User.findByIdAndUpdate(
        { _id: id },
        {
          username: username,
          email: email,
          password: passwordHash,
        }
      );
      const updated_user = await User.findById({ _id: id });
      return res.status(200).json(updated_user);
    }
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};

export const UpdateProfilePicture = async (req, res) => {
  const { id } = req.params;
  const { photo } = req.body;
  try {
    await User.findByIdAndUpdate(
      { _id: id },
      {
        photo: photo,
      }
    );
    const updated_profile_picture = await User.findById({ _id: id });
    return res.status(200).json(updated_profile_picture);
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted_user = await User.deleteOne({ _id: id });
    return res.status(200).json(deleted_user);
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};
