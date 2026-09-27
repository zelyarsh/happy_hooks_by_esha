const Media = require("../models/Media");

// Upload a single file (image or video) - stored on Cloudinary by the
// multer-storage-cloudinary middleware, so req.file.path is already the
// public https URL and req.file.filename is the Cloudinary public_id.
const uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file was uploaded",
      });
    }

    const type = req.file.mimetype.startsWith("video/") ? "video" : "image";

    const media = await Media.create({
      name: req.file.originalname,
      type,
      url: req.file.path,
      fileName: req.file.filename,
      size: req.file.size,
      uploadedBy: req.user ? req.user._id : null,
    });

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      url: media.url,
      media,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload file",
      error: error.message,
    });
  }
};

// Upload multiple files (image or video)
const uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files were uploaded",
      });
    }

    const mediaDocs = await Promise.all(
      req.files.map((file) => {
        const type = file.mimetype.startsWith("video/") ? "video" : "image";

        return Media.create({
          name: file.originalname,
          type,
          url: file.path,
          fileName: file.filename,
          size: file.size,
          uploadedBy: req.user ? req.user._id : null,
        });
      })
    );

    res.status(201).json({
      success: true,
      message: "Files uploaded successfully",
      urls: mediaDocs.map((m) => m.url),
      media: mediaDocs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload files",
      error: error.message,
    });
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple,
};
