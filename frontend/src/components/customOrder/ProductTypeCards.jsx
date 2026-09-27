import {
  FaSeedling,
  FaGift,
  FaKey,
  FaPaw,
  FaLeaf,
} from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Bouquet",
    icon: <FaSeedling size={38} />,
  },
  {
    id: 2,
    name: "Plushie",
    icon: <FaPaw size={38} />,
  },
  {
    id: 3,
    name: "Flower Pot",
    icon: <FaLeaf size={38} />,
  },
  {
    id: 4,
    name: "Keychain",
    icon: <FaKey size={38} />,
  },
  {
    id: 5,
    name: "Gift Box",
    icon: <FaGift size={38} />,
  },
];

function ProductTypeCards({
  selectedProduct,
  setSelectedProduct,
}) {
  return (
    <div>
      <label className="block text-lg font-semibold mb-5">
        Choose Product Type
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => setSelectedProduct(product.name)}
            className={`rounded-3xl border-2 p-6 transition-all duration-300 group
            ${
              selectedProduct === product.name
                ? "border-pink-500 bg-pink-50 shadow-xl scale-105"
                : "border-gray-200 hover:border-pink-300 hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all duration-300
              ${
                selectedProduct === product.name
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100 text-pink-500 group-hover:bg-pink-500 group-hover:text-white"
              }`}
            >
              {product.icon}
            </div>

            <h3 className="font-bold text-lg mt-5">
              {product.name}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductTypeCards;