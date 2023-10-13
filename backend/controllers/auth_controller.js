import User from "../models/user_model.js";
import bcrypt from "bcrypt";

export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // checking email
    const checkEmail_availability = await User.findOne({
      email: email,
    });

    // checking username
    const checkUsername_availability = await User.findOne({
      email: email,
    });

    // condition if username and email is taken
    if (checkEmail_availability) {
      return res.status(403).json({ system_message: "email already in use!" });
    }
    if (checkUsername_availability) {
      return res
        .status(403)
        .json({ system_message: "username is already taken!" });
    }

    // password hashing
    const salt = await bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(password, salt);

    // user creation and save to database
    const newUser = await User.create({
      username: username,
      email: email,
      password: passwordHash,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    throw new Error(error);
  }
};
