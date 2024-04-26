import mongoose, { Schema } from "mongoose";

const itemSchema = Schema({
  itemName: {
    type: String,
    required: [true, "Item name is required"],
  },
  placeAtItemLost: {
    type: String,
    required: [true, "Place information is required"],
  },
  username: {
    type: String,
    required: [true, "owner name is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "phone number is required"],
  },
  description: {
    type: String,
    required: [true, "Require to validate you are true owner"],
  },
  photos: [
    {
      public_id: String,
      url: String,
    },
  ],
  type: {
    type: String,
    enum: ["lost", "found"],
    default: "lost",
  },
});

export const Item = mongoose.model("Item", itemSchema);
