import { useState } from "react";
import {
  FaCloudUploadAlt,
  FaTrash,
  FaImages,
  FaSpinner,
} from "react-icons/fa";
import { uploadFile, uploadFiles } from "../../../services/uploadService";

function ProductGallery({
  form,
  uploadMainImage,
  uploadGallery,
  setForm,
  imageError,
}) {
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const removeMainImage = () => {
    setForm((prev) => ({ ...prev, image: "" }));
  };

  const removeGalleryImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleMainImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingMain(true);
      const url = await uploadFile(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (error) {
      console.error("Failed to upload image:", error);
      // fall back to a local preview so the form can still be edited/submitted
      uploadMainImage(e);
    } finally {
      setUploadingMain(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = [...e.target.files];
    if (!files.length) return;

    try {
      setUploadingGallery(true);
      const urls = await uploadFiles(files);
      setForm((prev) => ({ ...prev, images: urls }));
    } catch (error) {
      console.error("Failed to upload gallery images:", error);
      uploadGallery(e);
    } finally {
      setUploadingGallery(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Main Image */}

      <div className="bg-pink-50 rounded-3xl p-6">

        <h3 className="text-xl font-bold mb-5">Main Product Image</h3>

        {form.image ? (
          <div className="relative animate-fadeIn">
            <img
              src={form.image}
              alt="Product"
              className="w-full h-72 object-cover rounded-2xl"
            />
            <button
              onClick={removeMainImage}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center transition-all duration-200 hover:bg-red-600 hover:scale-110 active:scale-95"
            >
              <FaTrash />
            </button>
          </div>
        ) : (
          <label
            className={`border-2 border-dashed rounded-2xl h-72 flex flex-col justify-center items-center cursor-pointer transition-all duration-200 ${
              imageError
                ? "border-red-400 bg-red-50 hover:bg-red-100"
                : "border-pink-300 hover:bg-pink-100"
            }`}
          >
            {uploadingMain ? (
              <FaSpinner size={40} className="mb-4 text-pink-500 animate-spin" />
            ) : (
              <FaCloudUploadAlt
                size={55}
                className={`mb-4 transition-transform duration-200 ${
                  imageError ? "text-red-400" : "text-pink-500"
                }`}
              />
            )}
            <h4 className="font-semibold">
              {uploadingMain ? "Uploading..." : "Upload Product Image"}
            </h4>
            <p className="text-gray-500 mt-2 text-sm">JPG, PNG or WEBP</p>

            <input
              type="file"
              hidden
              accept="image/*"
              disabled={uploadingMain}
              onChange={handleMainImage}
            />
          </label>
        )}

        {imageError && (
          <p className="text-red-500 text-sm mt-2 animate-fadeIn">
            {imageError}
          </p>
        )}

      </div>

      {/* Gallery Upload */}

      <div className="bg-white rounded-3xl border p-6">

        <div className="flex justify-between items-center mb-5">

          <div>
            <h3 className="text-xl font-bold">Product Gallery</h3>
            <p className="text-gray-500 text-sm mt-1">
              Upload multiple images
            </p>
          </div>

          <label className="bg-pink-500 text-white px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-pink-600 hover:shadow-md active:scale-95 flex items-center gap-3">
            {uploadingGallery ? <FaSpinner className="animate-spin" /> : <FaImages />}
            {uploadingGallery ? "Uploading..." : "Add Images"}
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              disabled={uploadingGallery}
              onChange={handleGalleryUpload}
            />
          </label>

        </div>

        {form.images.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-2xl h-44 flex justify-center items-center text-gray-400">
            No Gallery Images
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

            {form.images.map((image, index) => (
              <div
                key={index}
                className="relative group animate-fadeIn"
                style={{ animationDelay: `${index * 60}ms`, animationFillMode: "backwards" }}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-40 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 flex items-center justify-center"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* Product Preview */}

      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 text-white">

        <h3 className="text-2xl font-bold mb-5">Live Preview</h3>

        <div className="bg-white rounded-3xl p-5 text-gray-800 transition-all duration-300">

          {form.image ? (
            <img
              src={form.image}
              alt=""
              className="w-full h-56 rounded-2xl object-cover"
            />
          ) : (
            <div className="h-56 rounded-2xl bg-gray-100 flex justify-center items-center">
              No Image
            </div>
          )}

          <h2 className="text-2xl font-bold mt-5">
            {form.name || "Product Name"}
          </h2>

          <p className="text-pink-600 font-bold text-xl mt-2">
            Rs. {form.price || "0"}
          </p>

          <p className="text-gray-500 mt-3">
            {form.description || "Product description will appear here..."}
          </p>

          <div className="flex gap-3 mt-5 flex-wrap">

            {form.featured && (
              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full transition-transform duration-200 hover:scale-105">
                ⭐ Featured
              </span>
            )}

            {form.isNew && (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full transition-transform duration-200 hover:scale-105">
                🆕 New Arrival
              </span>
            )}

            {form.badge && (
              <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full transition-transform duration-200 hover:scale-105">
                {form.badge}
              </span>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductGallery;
