import mongoose, { Schema } from "mongoose";

const itemSchema = Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  placeAtWhichProductLost: {
    type: String,
    required: [true, "Place information is required"],
  },
  personName: {
    type: String,
    required: [true, "owner name is required"],
  },
  phoneNo: {
    type: Number,
    required: [true, "phone number is required"],
  },
  specificDescriptionOfProuduct: {
    type: String,
    required: [true, "Require to validate you are true owner"],
  },
  photos: [
    {
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
