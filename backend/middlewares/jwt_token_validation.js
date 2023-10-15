import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

export const token_validation = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user_token = await User.findById(decoded._id);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ system_message: "Invalid Token / Token not recognize!" });
    }
  }
  if (!token) {
    return res.status(401).json({ system_message: "No Token Found!" });
  }
};
