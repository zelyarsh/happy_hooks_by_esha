import {
  FaBoxOpen,
  FaCheckCircle,
  FaStar,
  FaExclamationTriangle,
} from "react-icons/fa";

import { useProducts } from "../../../context/ProductContext";

function ProductStats() {
  const {
    totalProducts,
    activeProducts,
    featuredProducts,
    outOfStock,
  } = useProducts();

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      color: "bg-pink-500",
      icon: <FaBoxOpen />,
    },
    {
      title: "Active",
      value: activeProducts,
      color: "bg-green-500",
      icon: <FaCheckCircle />,
    },
    {
      title: "Featured",
      value: featuredProducts,
      color: "bg-yellow-500",
      icon: <FaStar />,
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      color: "bg-red-500",
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {stats.map((item, index) => (
        <div
          key={item.title}
          className="bg-white rounded-3xl p-6 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fadeIn"
          style={{ animationDelay: `${index * 60}ms`, animationFillMode: "backwards" }}
        >

          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-4xl font-bold mt-3">{item.value}</h2>
            </div>

            <div
              className={`${item.color} w-16 h-16 rounded-2xl text-white flex items-center justify-center text-2xl transition-transform duration-300 hover:scale-110 hover:rotate-6`}
            >
              {item.icon}
            </div>

          </div>

        </div>
      ))}

    </div>
  );
}

export default ProductStats;
