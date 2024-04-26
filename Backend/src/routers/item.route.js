import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteLostItem,
  itemFound,
  registerLostItem,
  updateLostItem,
} from "../controllers/item.controller.js";

const router = Router();

router
  .route("/register-lost-item")
  .post(verifyJWT, upload.single("itemPhoto"), registerLostItem);

router
  .route("/update-item/:itemId")
  .post(verifyJWT, upload.single("itemPhoto"), updateLostItem);

router.route("/delete-item/:itemId").delete(verifyJWT, deleteLostItem);

router.route("/item-found/:itemId").patch(verifyJWT, itemFound);

export default router;
