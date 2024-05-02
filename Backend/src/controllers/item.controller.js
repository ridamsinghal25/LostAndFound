import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Item } from "../models/item.model.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const registerLostItem = asyncHandler(async (req, res) => {
  const { itemName, placeAtItemLost, description } = req.body;

  if (
    [itemName, placeAtItemLost, description].some(
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
    throw new ApiError(500, "Error while uploading item photo file");
  }

  const item = await Item.create({
    itemName,
    placeAtItemLost,
    owner: req.user._id,
    description,
    itemPhoto: {
      public_id: itemPhoto.public_id,
      url: itemPhoto.url,
    },
  });

  if (!item) {
    throw new ApiError(500, "Something went wrong while registering item");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, item, "Item registered successfully"));
});

const updateLostItemDetails = asyncHandler(async (req, res) => {
  const { itemName, placeAtItemLost, description } = req.body;
  const { itemId } = req.params;

  if (
    [itemName, placeAtItemLost, description].some(
      (field) => field?.trim() === "" || !field
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!isValidObjectId(itemId)) {
    throw new ApiError(401, "Invalid item id");
  }

  const updatedItem = await Item.findByIdAndUpdate(
    itemId,
    {
      $set: {
        itemName,
        placeAtItemLost,
        description,
      },
    },
    { new: true }
  );

  if (!updatedItem) {
    throw new ApiError(500, "Something went wrong while updating item");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedItem, "item updated successfully"));
});

const updateLostItemPhoto = asyncHandler();

const getLostItem = asyncHandler(async (_, res) => {
  const lostItems = await Item.aggregate([
    {
      $match: {
        type: "lost",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              _id: 1,
              fullName: 1,
              phoneNumber: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
  ]);

  if (!lostItems || lostItems.length === 0) {
    return res.status(200).json(new ApiResponse(200, {}, "No lost item"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, lostItems, "lost item retrieved successfully"));
});

const deleteLostItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (!isValidObjectId(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await Item.findById(itemId);

  if (!item) {
    throw new ApiError(400, "item not found");
  }

  const itemPhotoPublicId = item.itemPhoto.public_id;

  const deleteItemPhoto = await deleteFromCloudinary(
    itemPhotoPublicId,
    "image"
  );

  if (deleteItemPhoto.result !== "ok") {
    throw new ApiError(500, "Something went wrong while deleting item photo");
  }

  const deleteItem = await item.deleteOne();

  if (deleteItem.deletedCount !== 1) {
    throw new ApiError(500, "Something went wrong while deleting item");
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

const getFoundItems = asyncHandler(async (req, res) => {
  const foundItems = await Item.aggregate([
    {
      $match: {
        type: "found",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              _id: 1,
              fullName: 1,
              phoneNumber: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
  ]);

  if (!foundItems || foundItems.length === 0) {
    return res.status(200).json(new ApiResponse(200, {}, "No found item"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, foundItems, "lost item retrieved successfully"));
});

const getLostItemOfUser = asyncHandler();

const getItemById = asyncHandler();

export {
  registerLostItem,
  updateLostItemDetails,
  getLostItem,
  deleteLostItem,
  itemFound,
  getFoundItems,
};
