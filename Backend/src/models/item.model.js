import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const itemSchema = Schema({
  itemName: {
    type: String,
    required: [true, "Item name is required"],
  },
  placeAtItemLost: {
    type: String,
    required: [true, "Place information is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: [true, "Require to validate you are true owner"],
    maxLength: [50, "Description cannot be more than 50 characters"],
  },
  itemPhoto: {
    public_id: {
      type: String,
      required: [true, "item photo public id is required"],
    },
    url: {
      type: String,
      required: [true, "item photo is required"],
    },
  },

  type: {
    type: String,
    enum: ["lost", "found"],
    default: "lost",
  },
});

itemSchema.plugin(mongooseAggregatePaginate);

export const Item = mongoose.model("Item", itemSchema);
