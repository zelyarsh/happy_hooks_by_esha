const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/subcategories`;

const getToken = () => {
  return localStorage.getItem("token");
};

// GET ALL
export const getSubCategories = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch subcategories."
    );
  }

  return data;
};

// GET BY CATEGORY
export const getSubCategoriesByCategory = async (
  categoryId
) => {
  const response = await fetch(
    `${API_URL}/category/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch category subcategories."
    );
  }

  return data;
};

// CREATE
export const createSubCategory = async (subCategory) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(subCategory),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create subcategory."
    );
  }

  return data;
};

// UPDATE
export const updateSubCategory = async (
  id,
  subCategory
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(subCategory),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update subcategory."
    );
  }

  return data;
};

// DELETE
export const deleteSubCategory = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete subcategory."
    );
  }

  return data;
};