import { useEffect, useState } from "react";
import { getTopProducts } from "../../../services/analyticsService";

function TopProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getTopProducts()
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("Failed to load top products:", err));
  }, []);

  const maxSold = Math.max(1, ...products.map((p) => p.totalQuantity));

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Top Selling Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No sales yet.</p>
      ) : (
        products.map((product) => (

          <div
            key={product._id}
            className="mb-6"
          >

            <div className="flex justify-between mb-2">

              <span>{product.productName}</span>

              <span>{product.totalQuantity}</span>

            </div>

            <div className="w-full bg-pink-100 rounded-full h-3">

              <div
                className="bg-pink-500 h-3 rounded-full transition-all"
                style={{
                  width: `${(product.totalQuantity / maxSold) * 100}%`,
                }}
              />

            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default TopProducts;
