import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";

function DuplicateProductModal({ open, onClose, onConfirm }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 150);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex justify-center items-center z-50 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl p-8 w-[430px] max-w-[92%] transition-all duration-200 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >

        <FaCopy className="text-purple-500 text-5xl mx-auto" />

        <h2 className="text-center text-2xl font-bold mt-5">
          Duplicate Product?
        </h2>

        <p className="text-center text-gray-500 mt-3">
          A copy will be created with all the same details.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={handleClose}
            className="flex-1 border rounded-xl py-3 transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm?.();
              handleClose();
            }}
            className="flex-1 rounded-xl py-3 bg-purple-500 text-white transition-all duration-200 hover:bg-purple-600 hover:shadow-lg active:scale-95"
          >
            Duplicate
          </button>

        </div>

      </div>

    </div>
  );
}

export default DuplicateProductModal;
