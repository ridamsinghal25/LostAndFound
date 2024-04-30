import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "phone number is required"],
      unique: true,
      validate: {
        validator: (value) => /^(\+\d{1,3}\s?)?\d{10}$/.test(value),
        message: (prop) => `${prop.value} is not valid phone number`,
      },
    },
    avatar: {
      type: {
        public_id: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "default_avatar.png",
        },
      },
      required: [true, "Avatar is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcryptjs.hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = function (password) {
  return bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
