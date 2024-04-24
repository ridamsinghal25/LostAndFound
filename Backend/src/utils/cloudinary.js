import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync();

    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) throw new Error("publicId is required");

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });

    return response;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
