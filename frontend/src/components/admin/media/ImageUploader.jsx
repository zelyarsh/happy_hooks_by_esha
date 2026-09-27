import { FaCloudUploadAlt, FaImages } from "react-icons/fa";
import { useMedia } from "../../../context/MediaContext";
import { useToast } from "../../../context/ToastContext";

function ImageUploader() {
  const { uploadFiles } = useMedia();
  const { showToast } = useToast();

  const handleUpload = async (e) => {
    const fileList = e.target.files;
    if (!fileList.length) return;
    const added = await uploadFiles(fileList, "image");
    showToast({ type: "success", title: "Images uploaded", message: `${added.length} image(s) added to your library.` });
    e.target.value = "";
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">
          <FaImages className="text-2xl text-pink-500"/>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Upload Images</h2>
          <p className="text-gray-500">JPG • PNG • WEBP</p>
        </div>
      </div>

      <label className="border-2 border-dashed border-pink-300 rounded-3xl h-72 flex flex-col justify-center items-center cursor-pointer hover:bg-pink-50 transition">
        <FaCloudUploadAlt className="text-6xl text-pink-400"/>
        <p className="font-semibold mt-5">Drag & Drop Images</p>
        <p className="text-gray-400 mt-2">or Click to Browse</p>
        <input hidden multiple type="file" accept="image/*" onChange={handleUpload} />
      </label>
    </div>
  );
}

export default ImageUploader;
