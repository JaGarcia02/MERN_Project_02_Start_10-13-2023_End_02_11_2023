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
    } else if (photo) {
      await User.findByIdAndUpdate(
        { _id: id },
        {
          photo: photo,
        }
      );
      const updated_user = await User.findById({ _id: id });
      return res.status(200).json(updated_user);
    }

    // if (!username && !email && !password) {
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       photo: photo,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // } else if (!email && !password && !photo) {
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       username: username,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // } else if (!username && !password && !photo) {
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       email: email,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // } else if (!username && !email && !photo) {
    //   const salt = await bcrypt.genSaltSync(10);
    //   const passwordHash = await bcrypt.hashSync(password, salt);
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       password: passwordHash,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // } else if (username && email && password) {
    //   const salt = await bcrypt.genSaltSync(10);
    //   const passwordHash = await bcrypt.hashSync(password, salt);
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       username: username,
    //       email: email,
    //       password: passwordHash,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // } else if (photo && username && !email && !password) {
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       username: username,
    //       photo: photo,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // } else if (photo && !username && email && !password) {
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       email: email,
    //       photo: photo,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // } else if (photo && !username && !email && password) {
    //   const salt = await bcrypt.genSaltSync(10);
    //   const passwordHash = await bcrypt.hashSync(password, salt);
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       password: passwordHash,
    //       photo: photo,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // } else if (photo && username && email && password) {
    //   const salt = await bcrypt.genSaltSync(10);
    //   const passwordHash = await bcrypt.hashSync(password, salt);
    //   await User.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       username: username,
    //       email: email,
    //       password: passwordHash,
    //       photo: photo,
    //     }
    //   );
    //   const updated_user = await User.findById({ _id: id });
    //   return res.status(200).json(updated_user);
    // }
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
