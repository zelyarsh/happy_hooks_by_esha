import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getMedia, deleteMedia as deleteMediaAPI } from "../services/mediaService";
import { uploadFiles as uploadFilesAPI } from "../services/uploadService";

const MediaContext = createContext();

const mapMedia = (m) => ({ ...m, id: m._id });

export function MediaProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await getMedia();
      setFiles((data.media || []).map(mapMedia));
    } catch (error) {
      console.error("Failed to fetch media:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // fileList: FileList from an <input type="file multiple">, type is unused
  // (kept for backwards compatibility with the uploader components) - the
  // backend infers image vs video from the file's mimetype.
  const uploadFiles = async (fileList) => {
    try {
      const urls = await uploadFilesAPI(fileList);
      await fetchFiles();
      return urls;
    } catch (error) {
      console.error("Failed to upload media:", error);
      return [];
    }
  };

  const deleteFile = async (id) => {
    try {
      await deleteMediaAPI(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete media:", error);
      return { success: false, message: error.message };
    }
  };

  const totalFiles = files.length;
  const totalImages = files.filter((f) => f.type === "image").length;
  const totalVideos = files.filter((f) => f.type === "video").length;

  const value = useMemo(
    () => ({ files, loading, fetchFiles, uploadFiles, deleteFile, totalFiles, totalImages, totalVideos }),
    [files, loading]
  );

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export const useMedia = () => useContext(MediaContext);
