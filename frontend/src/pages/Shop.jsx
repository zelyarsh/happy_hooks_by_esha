import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useProducts } from "../context/ProductContext";
import { useCategories } from "../context/CategoryContext";
import { mapStorefrontProducts } from "../utils/mapStorefrontProduct";
import ProductCard from "../components/product/ProductCard";
import ShopBanner from "../components/shop/ShopBanner";

function Shop() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  // Search from URL
  const urlSearch = searchParams.get("search") || "";

  // Search input value
  const [search, setSearch] = useState(urlSearch);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Keep input synced with URL
  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const categoryNames = useMemo(
    () => ["All", ...categories.filter((c) => c.status === "Active").map((c) => c.name)],
    [categories]
  );

  const storefrontProducts = useMemo(() => mapStorefrontProducts(products), [products]);

  let filteredProducts = storefrontProducts.filter((product) => {
    const query = search.toLowerCase();

    const matchesSearch =
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sorting

  switch (sortBy) {
    case "Price Low to High":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "Price High to Low":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "Name":
      filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    default:
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      break;
  }

  return (
    <section className="bg-pink-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <ShopBanner />

        {/* Breadcrumb */}

        <p className="text-gray-500 mt-8">
          Home / <span className="text-pink-500">Shop</span>
        </p>

        {/* Heading */}

        <div className="mt-6 mb-10">

          <h1 className="text-5xl font-bold">
            Shop Our Collection
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Discover beautiful handmade crochet gifts made with love.
          </p>

        </div>

        {/* Categories */}

        <div className="flex flex-wrap gap-4 mb-10">

          {categoryNames.map((category) => (

            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition ${
                selectedCategory === category
                  ? "bg-pink-500 text-white"
                  : "bg-white hover:bg-pink-100"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {/* Search + Sort */}

        <div className="flex flex-col md:flex-row justify-between gap-5 mb-10">

          <input
            type="text"
            placeholder="🔍 Search handmade products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setSearchParams({
                search: e.target.value,
              });
            }}
            className="md:w-96 w-full bg-white rounded-full border px-6 py-3 focus:outline-none focus:border-pink-500"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border rounded-full px-6 py-3"
          >
            <option>Newest</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Name</option>
          </select>

        </div>

        {/* Product Count */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold">
            Products
          </h2>

          <p className="text-gray-500">
            Showing {filteredProducts.length} Products
          </p>

        </div>

        {/* Products */}

        {loading ? (

          <div className="bg-white rounded-3xl p-16 shadow text-center text-gray-400">
            Loading products...
          </div>

        ) : filteredProducts.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-3xl p-16 shadow text-center">

            <div className="text-6xl mb-5">
              😔
            </div>

            <h2 className="text-3xl font-bold">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-4">
              Try another keyword.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default Shop;
