import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteLostItem,
  itemFound,
  registerLostItem,
  getLostItem,
  getFoundItems,
  updateLostItemDetails,
  updateLostItemPhoto,
} from "../controllers/item.controller.js";

const router = Router();

router
  .route("/register-lost-item")
  .post(verifyJWT, upload.single("itemPhoto"), registerLostItem);

router.route("/update-item/:itemId").patch(verifyJWT, updateLostItemDetails);

router
  .route("/update-itemphoto/:itemId")
  .patch(verifyJWT, upload.single("itemPhoto"), updateLostItemPhoto);

router.route("/lost-item").get(verifyJWT, getLostItem);

router.route("/delete-item/:itemId").delete(verifyJWT, deleteLostItem);

router.route("/item-found/:itemId").patch(verifyJWT, itemFound);

router.route("/found-item").get(verifyJWT, getFoundItems);

export default router;
