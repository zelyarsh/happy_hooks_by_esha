import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../../context/ProductContext";
import { mapStorefrontProducts } from "../../utils/mapStorefrontProduct";

function RelatedProducts({ currentProduct }) {
  const { products } = useProducts();

  const related = useMemo(() => {
    return mapStorefrontProducts(products)
      .filter(
        (item) =>
          item.category === currentProduct.category &&
          item.id !== currentProduct.id
      )
      .slice(0, 4);
  }, [products, currentProduct]);

  if (related.length === 0) return null;

  return (
    <section className="mt-28">

      <div className="flex items-center justify-between mb-10">

        <div>

          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
            You May Like
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Related Products
          </h2>

        </div>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {related.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}

export default RelatedProducts;
