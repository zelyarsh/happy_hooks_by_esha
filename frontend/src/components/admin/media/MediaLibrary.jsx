import { useMemo, useState } from "react";
import { FaTrash, FaImage, FaPlay, FaSearch, FaDownload } from "react-icons/fa";

import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";
import { useMedia } from "../../../context/MediaContext";

function MediaLibrary() {
  const { files, deleteFile } = useMedia();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
    [files, search]
  );

  return (
    <div className="space-y-10">

      <div className="grid lg:grid-cols-2 gap-8">
        <ImageUploader/>
        <VideoUploader/>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Uploaded Files</h2>

          <div className="relative">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-xl px-10 py-3 w-72"
            />
            <FaSearch className="absolute left-4 top-4 text-gray-400"/>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-16">No files match your search.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((file) => (
              <div key={file.id} className="rounded-3xl overflow-hidden border hover:shadow-xl transition">
                <div className="h-48 bg-pink-50 flex items-center justify-center overflow-hidden">
                  {file.url ? (
                    file.type === "image" ? (
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    ) : (
                      <video src={file.url} className="w-full h-full object-cover" />
                    )
                  ) : file.type === "image" ? (
                    <FaImage className="text-6xl text-pink-400"/>
                  ) : (
                    <FaPlay className="text-6xl text-pink-400"/>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-semibold truncate">{file.name}</h3>
                  <p className="text-gray-500 capitalize mt-1">{file.type}</p>

                  <div className="flex justify-between mt-5">
                    <a
                      href={file.url || "#"}
                      download={file.name}
                      onClick={(e) => { if (!file.url) e.preventDefault(); }}
                      className="bg-blue-500 text-white w-10 h-10 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                    >
                      <FaDownload/>
                    </a>

                    <button
                      onClick={() => { if (window.confirm(`Delete ${file.name}?`)) deleteFile(file.id); }}
                      className="bg-red-500 text-white w-10 h-10 rounded-lg hover:bg-red-600"
                    >
                      <FaTrash/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default MediaLibrary;
