import { FaTimes } from "react-icons/fa";

function DeleteCategoryModal({
  open,
  category,
  onClose,
  onDelete,
}) {

  if (!open || !category) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[500px] p-8">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-black">
            Delete Category
          </h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <p className="mt-8 text-gray-600">

          Are you sure you want to delete

          <span className="font-bold text-black">
            {" "}
            {category.name}
          </span>

          ?

        </p>

        <div className="mt-10 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onDelete(category.id);
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-red-500 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );
}

export default DeleteCategoryModal;