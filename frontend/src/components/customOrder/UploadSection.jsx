import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

function UploadSection({ image, setImage }) {
  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>

      <label className="block font-semibold text-lg mb-4">
        Inspiration Image
      </label>

      {!image ? (

        <label
          htmlFor="upload"
          className="cursor-pointer border-2 border-dashed border-pink-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-pink-500 hover:bg-pink-50 transition duration-300"
        >

          <FaCloudUploadAlt
            className="text-pink-500 mb-5"
            size={65}
          />

          <h3 className="text-2xl font-bold">
            Upload Inspiration
          </h3>

          <p className="text-gray-500 mt-3">
            Click here to choose an image
          </p>

          <p className="text-sm text-gray-400 mt-2">
            PNG • JPG • JPEG
          </p>

          <input
            id="upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />

        </label>

      ) : (

        <div className="border rounded-3xl overflow-hidden shadow-lg">

          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-80 object-cover"
          />

          <div className="p-5 flex justify-between items-center bg-white">

            <p className="font-medium truncate">
              {image.name}
            </p>

            <button
              type="button"
              onClick={() => setImage(null)}
              className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition"
            >

              <FaTrash />

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default UploadSection;