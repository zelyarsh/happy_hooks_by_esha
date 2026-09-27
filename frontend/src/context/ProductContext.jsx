import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  getProducts,
  createProduct,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI,
} from "../services/productService";

const ProductContext = createContext();

// Only these fields are recognised by the backend Product model.
// categoryId/subCategoryId may arrive either as a plain id string or as a
// populated object ({ _id, name, slug }) - normalise to an id either way.
const toPayload = (product) => ({
  categoryId: product.categoryId?._id || product.categoryId || undefined,
  subCategoryId: product.subCategoryId?._id || product.subCategoryId || null,
  name: product.name,
  slug: product.slug || undefined,
  description: product.description || "",
  price: product.price,
  compareAtPrice: product.compareAtPrice || 0,
  stock: product.stock,
  sku: product.sku || undefined,
  images:
    product.images && product.images.length
      ? product.images
      : product.image
      ? [product.image]
      : [],
  featured: !!product.featured,
  newArrival:
    product.isNew !== undefined ? !!product.isNew : !!product.newArrival,
  status: product.status || "Active",
  displayOrder: Number(product.displayOrder) || 1,
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // -----------------------------
  // ADD PRODUCT
  // -----------------------------
  const addProduct = async (product) => {
    try {
      const data = await createProduct(toPayload(product));
      setProducts((prev) => [data.product, ...prev]);
      return { success: true, product: data.product };
    } catch (error) {
      console.error("Failed to add product:", error);
      return { success: false, message: error.message };
    }
  };

  // -----------------------------
  // UPDATE PRODUCT
  // -----------------------------
  const updateProduct = async (updated) => {
    try {
      const id = updated._id || updated.id;
      const data = await updateProductAPI(id, toPayload(updated));
      setProducts((prev) =>
        prev.map((item) => (item._id === id ? data.product : item))
      );
      return { success: true, product: data.product };
    } catch (error) {
      console.error("Failed to update product:", error);
      return { success: false, message: error.message };
    }
  };

  // -----------------------------
  // DELETE PRODUCT
  // -----------------------------
  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      setProducts((prev) => prev.filter((item) => item._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete product:", error);
      return { success: false, message: error.message };
    }
  };

  // -----------------------------
  // DELETE MANY (bulk)
  // -----------------------------
  const deleteProducts = async (ids) => {
    try {
      await Promise.all(ids.map((id) => deleteProductAPI(id)));
      setProducts((prev) => prev.filter((item) => !ids.includes(item._id)));
      return { success: true };
    } catch (error) {
      console.error("Bulk delete failed:", error);
      await fetchProducts();
      return { success: false, message: error.message };
    }
  };

  // -----------------------------
  // DUPLICATE PRODUCT
  // -----------------------------
  const duplicateProduct = async (product) => {
    return addProduct({
      ...product,
      name: `${product.name} Copy`,
      sku: undefined,
      slug: undefined,
    });
  };

  // -----------------------------
  // FEATURED
  // -----------------------------
  const toggleFeatured = async (id) => {
    const product = products.find((item) => item._id === id);
    if (!product) return;
    return updateProduct({ ...product, featured: !product.featured });
  };

  const featureMany = async (ids, value = true) => {
    const selected = products.filter((item) => ids.includes(item._id));
    for (const product of selected) {
      if (!!product.featured !== value) {
        await updateProduct({ ...product, featured: value });
      }
    }
  };

  // -----------------------------
  // STATUS (Active / Inactive)
  // -----------------------------
  const toggleStatus = async (id) => {
    const product = products.find((item) => item._id === id);
    if (!product) return;
    return updateProduct({
      ...product,
      status: product.status === "Active" ? "Inactive" : "Active",
    });
  };

  // -----------------------------
  // NEW ARRIVAL
  // -----------------------------
  const toggleArrival = async (id) => {
    const product = products.find((item) => item._id === id);
    if (!product) return;
    return updateProduct({ ...product, isNew: !product.newArrival });
  };

  const arrivalMany = async (ids, value = true) => {
    const selected = products.filter((item) => ids.includes(item._id));
    for (const product of selected) {
      if (!!product.newArrival !== value) {
        await updateProduct({ ...product, isNew: value });
      }
    }
  };

  // -----------------------------
  // HELPERS
  // -----------------------------
  const getProduct = (id) => products.find((p) => p._id === id);

  // -----------------------------
  // STATS
  // -----------------------------
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "Active").length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;

  const value = useMemo(
    () => ({
      products,
      loading,
      setProducts,

      fetchProducts,

      addProduct,
      updateProduct,
      deleteProduct,
      deleteProducts,

      duplicateProduct,

      toggleFeatured,
      featureMany,

      toggleArrival,
      arrivalMany,

      toggleStatus,

      getProduct,

      totalProducts,
      activeProducts,
      featuredProducts,
      outOfStock,
    }),
    [products, loading, totalProducts, activeProducts, featuredProducts, outOfStock]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
