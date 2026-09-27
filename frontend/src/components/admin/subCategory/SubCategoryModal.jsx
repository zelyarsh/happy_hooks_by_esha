import { FaTimes } from "react-icons/fa";
import SubCategoryForm from "./SubCategoryForm";

function SubCategoryModal({ open, subCategory, onClose, onSave }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
      
      {/* MODAL CARD: Strict max height and overflow-hidden */}
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* HEADER (Stays Fixed at Top) */}
        <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
          <h2 className="text-2xl font-black text-gray-900">
            {subCategory ? "Edit Sub Category" : "Add Sub Category"}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-pink-100 flex items-center justify-center transition-colors text-gray-600"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* SCROLLABLE BODY ZONE */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 sm:p-8">
          <SubCategoryForm
            subCategory={subCategory}
            onSave={onSave}
            onClose={onClose}
          />
        </div>

      </div>
    </div>
  );
}

export default SubCategoryModal;