import { useEffect, useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

function DeleteProductModal({ open, onClose, onDelete, product }) {
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
      className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl w-[450px] max-w-[92%] p-8 shadow-2xl transition-all duration-200 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >

        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <FaTrash className="text-red-500" size={35} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-6">
          Delete Product
        </h2>

        <p className="text-gray-500 text-center mt-3">
          Are you sure you want to delete{" "}
          <span className="font-bold text-gray-800">{product.name}</span>?
          This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={handleClose}
            className="flex-1 border rounded-xl py-3 transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            <FaTimes className="inline mr-2" />
            Cancel
          </button>

          <button
            onClick={() => {
              onDelete(product.id);
              handleClose();
            }}
            className="flex-1 bg-red-500 text-white rounded-xl py-3 transition-all duration-200 hover:bg-red-600 hover:shadow-lg active:scale-95"
          >
            <FaTrash className="inline mr-2" />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteProductModal;
