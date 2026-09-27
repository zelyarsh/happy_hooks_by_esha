import { useMemo } from "react";
import { useProducts } from "../../context/ProductContext";
import { mapStorefrontProducts } from "../../utils/mapStorefrontProduct";
import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  const { products, loading } = useProducts();

  const featured = useMemo(() => {
    const mapped = mapStorefrontProducts(products).filter((p) => p.featured);
    return (mapped.length ? mapped : mapStorefrontProducts(products)).slice(0, 8);
  }, [products]);

  if (!loading && featured.length === 0) return null;

  return (
    <section className="py-24 bg-pink-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-pink-500 uppercase tracking-[4px] font-semibold">
            Our Collection
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Featured Products
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading products...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product) => (
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

export default FeaturedProducts;
