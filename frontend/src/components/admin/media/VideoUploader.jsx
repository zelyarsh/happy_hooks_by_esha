import { FaVideo, FaCloudUploadAlt } from "react-icons/fa";
import { useMedia } from "../../../context/MediaContext";
import { useToast } from "../../../context/ToastContext";

function VideoUploader() {
  const { uploadFiles } = useMedia();
  const { showToast } = useToast();

  const handleUpload = async (e) => {
    const fileList = e.target.files;
    if (!fileList.length) return;
    const added = await uploadFiles(fileList, "video");
    showToast({ type: "success", title: "Videos uploaded", message: `${added.length} video(s) added to your library.` });
    e.target.value = "";
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">
          <FaVideo className="text-2xl text-pink-500"/>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Upload Videos</h2>
          <p className="text-gray-500">MP4 • MOV • WEBM</p>
        </div>
      </div>

      <label className="border-2 border-dashed border-pink-300 rounded-3xl h-72 flex flex-col justify-center items-center cursor-pointer hover:bg-pink-50 transition">
        <FaCloudUploadAlt className="text-6xl text-pink-400"/>
        <p className="font-semibold mt-5">Drag & Drop Videos</p>
        <p className="text-gray-400 mt-2">or Click to Browse</p>
        <input hidden multiple type="file" accept="video/*" onChange={handleUpload} />
      </label>
    </div>
  );
}

export default VideoUploader;
