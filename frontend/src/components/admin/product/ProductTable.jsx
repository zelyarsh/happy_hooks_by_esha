import { useEffect, useMemo, useState } from "react";

import { useProducts } from "../../../context/ProductContext";

import ProductActions from "./ProductActions";
import ProductPagination from "./ProductPagination";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductEmptyState from "./ProductEmptyState";

import BulkActions from "./BulkActions";
import ViewProductModal from "./ViewProductModal";
import DeleteProductModal from "./DeleteProductModal";

const PAGE_SIZE = 6;

const PLACEHOLDER_IMAGE =
  "https://placehold.co/300x300/fce7f3/ec4899?text=No+Image";

// Backend products come with populated categoryId/subCategoryId objects and
// an `images` array - map to the flat shape the admin UI was built around.
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

function ProductTable({ search = "", category = "", sort = "", onEdit }) {

  const {
    products,
    deleteProduct,
    deleteProducts,
    featureMany,
    arrivalMany,
  } = useProducts();

  const mappedProducts = useMemo(() => products.map(mapProduct), [products]);

  const [selected, setSelected] = useState([]);
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

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = () => {
    deleteProducts(selected);
    setSelected([]);
  };

  const featureSelected = () => {
    featureMany(selected, true);
    setSelected([]);
  };

  const arrivalSelected = () => {
    arrivalMany(selected, true);
    setSelected([]);
  };

  return (
    <>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          selected.length > 0 ? "max-h-40 opacity-100 mb-6" : "max-h-0 opacity-0"
        }`}
      >
        <BulkActions
          selected={selected}
          deleteSelected={deleteSelected}
          featureSelected={featureSelected}
          arrivalSelected={arrivalSelected}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="animate-fadeIn">
          <ProductEmptyState />
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-pink-50">

                <tr>

                  <th className="p-5">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-pink-500 cursor-pointer"
                      checked={
                        selected.length === paginatedProducts.length &&
                        paginatedProducts.length > 0
                      }
                      onChange={(e) =>
                        e.target.checked
                          ? setSelected(paginatedProducts.map((x) => x.id))
                          : setSelected([])
                      }
                    />
                  </th>

                  <th className="p-3">Image</th>
                  <th className="text-left p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>

                </tr>

              </thead>

              <tbody>

                {paginatedProducts.map((product, index) => (

                  <tr
                    key={product.id}
                    className="border-t border-gray-100 hover:bg-pink-50/70 transition-colors duration-200 animate-fadeIn"
                    style={{ animationDelay: `${index * 40}ms`, animationFillMode: "backwards" }}
                  >

                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-pink-500 cursor-pointer"
                        checked={selected.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                      />
                    </td>

                    <td className="p-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </td>

                    <td className="font-semibold text-gray-800">
                      {product.name}
                      {product.featured && (
                        <span className="ml-2 text-yellow-500 text-xs">★</span>
                      )}
                    </td>

                    <td className="text-center text-gray-600">
                      <div>{product.category || "—"}</div>
                      {product.subCategory && (
                        <div className="text-xs text-gray-400">
                          {product.subCategory}
                        </div>
                      )}
                    </td>

                    <td className="text-center font-medium">
                      Rs. {product.price}
                    </td>

                    <td className="text-center">{product.stock}</td>

                    <td className="text-center">
                      <ProductStatusBadge stock={product.stock} />
                    </td>

                    <td className="p-3">
                      <ProductActions
                        product={product}
                        onView={() => setViewProduct(product)}
                        onEdit={() => onEdit(product)}
                        onDelete={() => setDeleteItem(product)}
                      />
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>

        </div>
      )}

      {filteredProducts.length > 0 && (
        <ProductPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          pageSize={PAGE_SIZE}
        />
      )}

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

export default ProductTable;
