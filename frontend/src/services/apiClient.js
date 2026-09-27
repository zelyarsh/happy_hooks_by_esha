// Shared fetch helper used by the newer service modules.
// Keeps the same fetch()-based style already used by categoryService /
// subCategoryService, just without repeating the boilerplate everywhere.

export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getToken = () => localStorage.getItem("token");

export const apiRequest = async (path, { method = "GET", body, isForm = false } = {}) => {
  const token = getToken();

  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isForm && body !== undefined) headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error((data && data.message) || `Request failed (${response.status})`);
  }

  return data;
};
