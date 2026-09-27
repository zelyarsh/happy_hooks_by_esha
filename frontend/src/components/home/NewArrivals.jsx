import { useMemo } from "react";
import { useProducts } from "../../context/ProductContext";
import { mapStorefrontProducts } from "../../utils/mapStorefrontProduct";
import ProductCard from "../product/ProductCard";
import { Link } from "react-router-dom";

function NewArrivals() {
  const { products, loading } = useProducts();

  const newProducts = useMemo(() => {
    const mapped = mapStorefrontProducts(products).filter((p) => p.isNew);
    return (mapped.length ? mapped : mapStorefrontProducts(products)).slice(0, 4);
  }, [products]);

  if (!loading && newProducts.length === 0) return null;

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <div>

            <p className="text-pink-500 uppercase tracking-[4px] font-semibold">
              New Arrivals
            </p>

            <h2 className="text-5xl font-bold mt-3">
              Freshly Handmade
            </h2>

            <p className="text-gray-600 mt-4">
              Discover our newest crochet creations.
            </p>

          </div>

          <Link
            to="/shop"
            className="text-pink-500 font-semibold hover:underline"
          >
            View All →
          </Link>

        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading products...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {newProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}

export default NewArrivals;
