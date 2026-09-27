import { useEffect, useState } from "react";
import { FaTimes, FaStar } from "react-icons/fa";

function ProductDetailsModal({ open, product, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
  }, [open]);

  if (!open || !product) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 150);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl w-[850px] max-w-[95%] p-8 relative transition-all duration-200 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >

        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-500 transition-all duration-200 hover:text-red-500 hover:rotate-90"
        >
          <FaTimes size={22} />
        </button>

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[420px] object-cover rounded-2xl"
            />

            <div className="grid grid-cols-4 gap-3 mt-4">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="rounded-xl h-20 w-full object-cover border transition-transform duration-200 hover:scale-105"
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>

            <p className="text-pink-600 font-bold text-2xl mt-3">
              Rs. {product.price}
            </p>

            <div className="flex items-center gap-2 mt-4">
              <FaStar className="text-yellow-500" />
              <span>{product.rating}</span>
              <span className="text-gray-500">
                ({product.reviews} Reviews)
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Badge:</strong> {product.badge}</p>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-lg">Description</h4>
              <p className="text-gray-600 mt-3 leading-7">
                {product.description}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetailsModal;
