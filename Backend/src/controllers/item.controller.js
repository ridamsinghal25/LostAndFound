import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Item } from "../models/item.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const registerLostItem = asyncHandler(async (req, res) => {
  const { itemName, placeAtItemLost, username, phoneNumber, description } =
    req.body;

  if (
    [itemName, placeAtItemLost, username, phoneNumber, description].some(
      (field) => field?.trim() === "" || !field
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const itemPhotoLocalPath = req.file?.path;

  if (!itemPhotoLocalPath) {
    throw new ApiError(400, "Item photo is required");
  }

  const itemPhoto = await uploadToCloudinary(itemPhotoLocalPath);

  if (!itemPhoto) {
    throw new ApiError(500, "Error while uploading avatar file");
  }

  const item = await Item.create({
    itemName,
    placeAtItemLost,
    username,
    phoneNumber: parseInt(phoneNumber),
    description,
    photos: [
      {
        public_id: itemPhoto.public_id,
        url: itemPhoto.url,
      },
    ],
  });

  if (!item) {
    throw new ApiError(500, "Something went wrong while registering item");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, item, "Item registered successfully"));
});

const getLostItem = asyncHandler(async (req, res) => {
  const item = await Item.find({ type: "lost" });

  if (!item) {
    throw new ApiError(404, "item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, item, "item received successfully"));
});

const deleteLostItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (!isValidObjectId(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await Item.findByIdAndDelete(itemId);

  if (!item) {
    throw new ApiError(400, "item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "item deleted successfully"));
});

const itemFound = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (!isValidObjectId(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await Item.findByIdAndUpdate(
    itemId,
    {
      $set: {
        type: "found",
      },
    },
    {
      new: true,
    }
  );

  if (!item) {
    throw new ApiError(404, "item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, item, "item found successfully"));
});

const getFoundItem = asyncHandler(async (req, res) => {
  const item = await Item.find({ type: "found" });

  if (!item) {
    throw new ApiError(404, "item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, item, "item received successfully"));
});

export {
  registerLostItem,
  getLostItem,
  deleteLostItem,
  itemFound,
  getFoundItem,
};
