import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ProductImageSlider from "./ProductImageSlider";
import ProductDetailsCard from "./ProductDetailsCard";

function ViewProductModal({ open, product, onClose }) {
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
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-6 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl w-full max-w-7xl overflow-hidden shadow-2xl transition-all duration-200 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >

        {/* Header */}

        <div className="flex justify-between items-center border-b px-8 py-6">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Product Details
            </h2>
            <p className="text-gray-500 mt-1">
              View complete product information
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-11 h-11 rounded-full hover:bg-pink-100 transition-all duration-200 hover:rotate-90 flex items-center justify-center"
          >
            <FaTimes size={22} className="text-gray-600" />
          </button>

        </div>

        {/* Body */}

        <div className="grid lg:grid-cols-2 gap-10 p-8 max-h-[75vh] overflow-y-auto">

          <ProductImageSlider images={product.images || [product.image]} />

          <ProductDetailsCard product={product} />

        </div>

      </div>

    </div>
  );
}

export default ViewProductModal;
