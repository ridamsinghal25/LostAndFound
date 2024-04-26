import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getCurrentUserDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/current-user").get(verifyJWT, getCurrentUserDetails);

export default router;
