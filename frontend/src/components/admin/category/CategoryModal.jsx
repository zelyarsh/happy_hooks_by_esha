import { FaTimes } from "react-icons/fa";
import CategoryForm from "./CategoryForm";

function CategoryModal({
  open,
  category,
  onClose,
  onSave,
}) {

  if (!open) return null;


  return (

    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="
        bg-white
        rounded-3xl
        w-full
        max-w-3xl
        max-h-[90vh]
        overflow-hidden
        shadow-2xl
        flex
        flex-col
      ">


        {/* Header */}

        <div className="
          flex
          justify-between
          items-center
          p-6
          border-b
          border-gray-100
          sticky
          top-0
          bg-white
          z-10
        ">

          <h2 className="text-3xl font-black">

            {category
              ? "Edit Category"
              : "Add Category"
            }

          </h2>


          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              hover:bg-pink-50
              flex
              items-center
              justify-center
              transition
            "
          >

            <FaTimes size={22}/>

          </button>


        </div>




        {/* Scrollable Form Area */}

        <div
          className="
            p-8
            overflow-y-auto
            flex-1
          "
        >

          <CategoryForm

            category={category}

            onSave={onSave}

            onClose={onClose}

          />


        </div>


      </div>


    </div>

  );

}

export default CategoryModal;