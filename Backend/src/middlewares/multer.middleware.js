import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB limit
};

export const upload = multer({
  storage: storage,
  limits: limits,
});
