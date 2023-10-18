import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ************************************************************** Signup ************************************************************** //
export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // checking email
    const checkEmail_availability = await User.findOne({
      email: email,
    });

    // checking username
    const checkUsername_availability = await User.findOne({
      username: username,
    });

    // condition if username and email is taken
    if (checkEmail_availability && checkUsername_availability) {
      return res
        .status(403)
        .json({ system_message: "email and username is already taken!" });
    } else if (checkEmail_availability) {
      return res.status(403).json({ system_message: "email already taken!" });
    } else if (checkUsername_availability) {
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
    return res.status(201).json(newUser);
  } catch (error) {
    throw new Error(error);
  }
};
// ************************************************************** Signup ************************************************************** //

// ************************************************************** Signin ************************************************************** //
export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check email existence
    const check_email_exist = await User.findOne({ email: email });
    if (!check_email_exist) {
      return res.status(403).json({ system_message: "Email not found!" });
    }

    // check password validation
    const check_password_match = await bcrypt.compareSync(
      password,
      check_email_exist.password
    );
    if (!check_password_match) {
      return res.status(403).json({ system_message: "Wrong password!" });
    }

    // jwt token signing
    const token = jwt.sign(
      {
        id: check_email_exist._id,
        username: check_email_exist.username,
        email: check_email_exist.email,
      },
      process.env.JWT_SECRET
    );

    if (check_email_exist && check_password_match) {
      const Token = generate_token(
        check_email_exist._id,
        check_email_exist.username,
        check_email_exist.email,
        check_email_exist.password
      );
      return res
        .status(200)
        .cookie("user_token", Token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
        })
        .json({
          system_message: "User Logged in",
          payload: {
            id: check_email_exist._id,
            username: check_email_exist.username,
            email: check_email_exist.email,
            password: check_email_exist.password,
          },
          token: Token,
          login_method: "System",
        });
    }

    // return res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
    //   })
    //   .status(200)
    //   .json({ token });
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};
// ************************************************************** Signin ************************************************************** //

// ************************************************************** Google Signin ************************************************************** //
export const SignIn_Google = async (req, res) => {
  const { username, email, photo } = req.body;
  try {
    const check_email_exist = await User.findOne({ email: email });
    if (check_email_exist) {
      const Token = generate_token_google(
        check_email_exist._id,
        check_email_exist.username,
        check_email_exist.email,
        check_email_exist.password,
        check_email_exist.photo
      );
      return res
        .status(200)
        .cookie("user_token", Token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
        })
        .json({
          payload: check_email_exist,
          system_message: "User Exist!",
          token: Token,
          login_method: "Google",
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).split(-8) +
        Math.random().toString(36).split(-8);

      const salt = await bcrypt.genSaltSync(10);
      const passwordHash_googleUser = await bcrypt.hashSync(
        generatedPassword,
        salt
      );

      await User.create({
        username: username,
        email: email,
        password: passwordHash_googleUser,
        photo: photo,
      });

      const user_google_data = await User.findOne({ email: email });
      const Token = generate_token_google(
        user_google_data?._id,
        user_google_data?.username,
        user_google_data?.email,
        user_google_data?.password,
        user_google_data?.photo
      );

      return res
        .status(201)
        .cookie("user_token", Token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
        })
        .json({
          payload: user_google_data,
          system_message: "User Created!",
          token: Token,
          login_method: "Google",
        });
    }

    // if email exixst = sign token
    // if (check_email_exist) {
    //   // const { password: password, ...rest } = check_email_exist?._doc;
    //   const Token = generate_token_google(
    //     check_email_exist._id,
    //     check_email_exist.username,
    //     check_email_exist.email,
    //     check_email_exist.password,
    //     check_email_exist.photo
    //   );
    //   return res
    //     .status(200)
    //     .cookie("user_token", Token, {
    //       expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
    //     })
    //     .json({ system_message: "User Exist!", token: Token });
    // } else {
    //   const generatedPassword =
    //     Math.random().toString(36).split(-8) +
    //     Math.random().toString(36).split(-8);

    //   const salt = await bcrypt.genSaltSync(10);
    //   const passwordHash_googleUser = await bcrypt.hashSync(
    //     generatedPassword,
    //     salt
    //   );

    //   await User.create({
    //     username:
    //       username.split(" ").join("").toLowerCase() +
    //       Math.random().toString(36).split(-4),
    //     email: email,
    //     password: passwordHash_googleUser,
    //     photo: photo,
    //   });
    //   const Token = generate_token_google(
    //     check_email_exist._id,
    //     check_email_exist.username,
    //     check_email_exist.email,
    //     check_email_exist.password,
    //     check_email_exist.photo
    //   );

    //   return res
    //     .status(201)
    //     .cookie("user_token", Token, {
    //       expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
    //     })
    //     .json({
    //       system_message: "User Created!",
    //       token: Token,
    //       login_method: "Google",
    //     });
    // }
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};
// ************************************************************** Google Signin ************************************************************** //

export const GetToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ system_message: "No Token!" });
  }
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    const token_data = await User.findById(decoded_token._id);
    if (!token_data) {
      return res.status(401).json({ system_message: "Not Found!" });
    } else {
      return res.status(200).json(decoded_token);
    }
  } catch (error) {
    return res.status(401).json({ system_message: "Token Expired!" });
  }
};

const generate_token_google = (_id, username, email, password, photo) => {
  return jwt.sign(
    {
      _id,
      username,
      email,
      password,
      photo,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );
};

const generate_token = (_id, username, email, password) => {
  return jwt.sign(
    {
      _id,
      username,
      email,
      password,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );
};
