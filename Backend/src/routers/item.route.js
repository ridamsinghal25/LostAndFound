import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteLostItem,
  itemFound,
  registerLostItem,
  getLostItem,
  getFoundItem,
} from "../controllers/item.controller.js";

const router = Router();

router
  .route("/register-lost-item")
  .post(verifyJWT, upload.single("itemPhoto"), registerLostItem);

router.route("/lost-item").get(verifyJWT, getLostItem);

router.route("/delete-item/:itemId").delete(verifyJWT, deleteLostItem);

router.route("/item-found/:itemId").patch(verifyJWT, itemFound);

router.route("/found-item").get(verifyJWT, getFoundItem);

export default router;
