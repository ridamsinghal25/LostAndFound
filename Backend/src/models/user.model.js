import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required"],
      minLength: [5, "fullName must be atleast 5 characters"],
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
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phoneNo: {
      type: Number,
      required: [true, "phone number is required"],
    },
  },
  { timestamps: true }
);

console.log("userSchema", userSchema);
console.log("userSchema", userSchema.methods);

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
