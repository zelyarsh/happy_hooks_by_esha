const Media = require("../models/Media");
const cloudinary = require("../config/cloudinary");

// GET all media
const getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: media.length,
      media,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch media",
      error: error.message,
    });
  }
};

// DELETE media (removes the DB record and the file on Cloudinary)
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media file not found",
      });
    }

    await cloudinary.uploader.destroy(media.fileName, {
      resource_type: media.type === "video" ? "video" : "image",
    });

    await media.deleteOne();

    res.status(200).json({
      success: true,
      message: "Media file deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete media",
      error: error.message,
    });
  }
};

module.exports = {
  getMedia,
  deleteMedia,
};
