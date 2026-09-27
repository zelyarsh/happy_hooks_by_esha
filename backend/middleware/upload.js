const multer = require("multer");
const CloudinaryStorage = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const allowedTypes =
  /jpeg|jpg|png|webp|gif|avif|mp4|mov|webm/;

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");

    return {
      folder: "happy-hooks",
      resource_type: isVideo ? "video" : "image",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif",
        "avif",
        "mp4",
        "mov",
        "webm",
      ],
    };
  },
});

const fileFilter = (req, file, cb) => {
  const ext = file.originalname
    .split(".")
    .pop()
    .toLowerCase();

  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");

  if (
    (isImage || isVideo) &&
    allowedTypes.test(ext)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type. Only images and videos are allowed."
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

module.exports = upload;