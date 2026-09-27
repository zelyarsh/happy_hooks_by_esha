import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../../../context/ProductContext";
import ProductCard from "./ProductCard";
import ProductPagination from "./ProductPagination";
import ProductEmptyState from "./ProductEmptyState";
import ViewProductModal from "./ViewProductModal";
import DeleteProductModal from "./DeleteProductModal";

const PAGE_SIZE = 8;

const PLACEHOLDER_IMAGE =
  "https://placehold.co/300x300/fce7f3/ec4899?text=No+Image";

const mapProduct = (product) => ({
  ...product,
  id: product._id,
  image: product.images?.[0] || PLACEHOLDER_IMAGE,
  category: product.categoryId?.name || "—",
  subCategory: product.subCategoryId?.name || "",
  isNew: !!product.newArrival,
});

function sortProducts(list, sort) {
  const arr = [...list];
  switch (sort) {
    case "priceLow":
      return arr.sort((a, b) => a.price - b.price);
    case "priceHigh":
      return arr.sort((a, b) => b.price - a.price);
    case "stock":
      return arr.sort((a, b) => b.stock - a.stock);
    case "name":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return arr.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
  }
}

function ProductGrid({ search = "", category = "", sort = "", onEdit }) {
  const { products, deleteProduct } = useProducts();
  const mappedProducts = useMemo(() => products.map(mapProduct), [products]);

  const [viewProduct, setViewProduct] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [page, setPage] = useState(1);
  const filteredProducts = useMemo(() => {
    const filtered = mappedProducts.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        category === "" || item.category === category;
      return matchSearch && matchCategory;
    });
    return sortProducts(filtered, sort);
  }, [mappedProducts, search, category, sort]);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );
  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);
  if (filteredProducts.length === 0) {
    return (
      <div className="animate-fadeIn">
        <ProductEmptyState />
      </div>
    );
  }
  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {paginatedProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 40}ms`, animationFillMode: "backwards" }}
          >
            <ProductCard
              product={product}
              onView={() => setViewProduct(product)}
              onEdit={() => onEdit(product)}
              onDelete={() => setDeleteItem(product)}
            />
          </div>
        ))}
      </div>
      <ProductPagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        totalItems={filteredProducts.length}
        pageSize={PAGE_SIZE}
      />
      <ViewProductModal
        open={!!viewProduct}
        product={viewProduct}
        onClose={() => setViewProduct(null)}
      />
      <DeleteProductModal
        open={!!deleteItem}
        product={deleteItem}
        onClose={() => setDeleteItem(null)}
        onDelete={deleteProduct}
      />
    </>
  );
}
export default ProductGrid;
