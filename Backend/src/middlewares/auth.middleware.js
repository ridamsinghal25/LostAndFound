import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = asyncHandler(async (req, res) => {
  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(404, "Token not found");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SCERET
    );

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "Invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error: ", error.message || "Invalid user token");
  }
});

export { verifyJWT };
