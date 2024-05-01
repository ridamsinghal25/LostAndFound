import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changeUserPassword,
  getCurrentUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  updateUserAvatar,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/current-user").get(verifyJWT, getCurrentUserDetails);

router.route("/update-user").patch(verifyJWT, updateUserDetails);

router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router.route("/update-password").patch(verifyJWT, changeUserPassword);

export default router;
