import { apiRequest } from "./apiClient";

// Uploads a single image/video file and returns its public URL.
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const data = await apiRequest("/upload", {
    method: "POST",
    body: formData,
    isForm: true,
  });

  return data.url;
};

// Uploads multiple files at once and returns an array of URLs.
export const uploadFiles = async (files) => {
  const formData = new FormData();
  [...files].forEach((file) => formData.append("files", file));

  const data = await apiRequest("/upload/multiple", {
    method: "POST",
    body: formData,
    isForm: true,
  });

  return data.urls;
};
