const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/categories`;

// Get token
const getToken = () => {
  return localStorage.getItem("token");
};

// ================================
// GET CATEGORIES
// ================================

export const getCategories = async () => {
  const token = getToken();

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch categories.");
  }

  return data;
};

// ================================
// CREATE CATEGORY
// ================================

export const createCategory = async (category) => {
  const token = getToken();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create category.");
  }

  return data;
};

// ================================
// UPDATE CATEGORY
// ================================

export const updateCategory = async (id, category) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update category.");
  }

  return data;
};

// ================================
// DELETE CATEGORY
// ================================

export const deleteCategory = async (id) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete category.");
  }

  return data;
};