const Settings = require("../models/Settings");

const getOrCreateSettings = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
};

// GET settings (public - storefront needs store name, socials, payment info etc.)
const getSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
      error: error.message,
    });
  }
};

// UPDATE settings - admin only
// Accepts any of: general, shipping, payment, social (partial updates supported)
const updateSettings = async (req, res) => {
  try {
    const { general, shipping, payment, social } = req.body;

    const settings = await getOrCreateSettings();

    if (general !== undefined) {
      settings.general = {
        ...settings.general.toObject(),
        ...general,
      };
    }

    if (shipping !== undefined) {
      settings.shipping = {
        ...settings.shipping.toObject(),
        ...shipping,
      };
    }

    if (payment !== undefined) {
      settings.payment = {
        ...settings.payment.toObject(),
        ...payment,
      };
    }

    if (social !== undefined) {
      settings.social = {
        ...settings.social.toObject(),
        ...social,
      };
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update settings",
      error: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
