import { FaTags } from "react-icons/fa";

function SubCategoryHeader() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 flex justify-between items-center">

      <div>

        <p className="uppercase tracking-widest text-pink-500 font-semibold">
          Product Organization
        </p>

        <h1 className="text-4xl font-black mt-2">
          Sub Categories
        </h1>

        <p className="text-gray-500 mt-3">
          Manage sub categories under every category.
        </p>

      </div>

      <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-4xl">

        <FaTags />

      </div>

    </div>
  );
}

export default SubCategoryHeader;