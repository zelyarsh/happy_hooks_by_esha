import { useRef } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

function UploadSection({ image, onImageSelect }) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    onImageSelect(file);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const removeImage = () => {
    onImageSelect(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>

      <label className="font-semibold block mb-3">
        Upload Inspiration Image
      </label>

      {!image ? (
        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-pink-300 rounded-3xl p-12 text-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition duration-300"
        >

          <FaCloudUploadAlt className="text-6xl text-pink-500 mx-auto" />

          <h3 className="text-2xl font-semibold mt-5">
            Upload Reference Image
          </h3>

          <p className="text-gray-500 mt-3">
            Click here to choose an image.
          </p>

          <p className="text-gray-400 text-sm mt-2">
            PNG, JPG or JPEG
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

        </div>
      ) : (
        <div className="border rounded-3xl p-5">

          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-72 object-cover rounded-2xl"
          />

          <button
            type="button"
            onClick={removeImage}
            className="mt-5 w-full bg-red-500 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-red-600 transition"
          >

            <FaTrash />

            Remove Image

          </button>

        </div>
      )}

    </div>
  );
}

export default UploadSection;