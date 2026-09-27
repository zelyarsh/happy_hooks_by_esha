import { FaLayerGroup } from "react-icons/fa";

function CategoryHeader() {
  return (
    <div className="flex items-center justify-between bg-white rounded-3xl shadow-lg p-8">

      <div>

        <p className="text-pink-500 font-semibold uppercase tracking-widest">
          Category Management
        </p>

        <h1 className="text-4xl font-black mt-2">
          Categories
        </h1>

        <p className="text-gray-500 mt-2">
          Create, update and organize product categories.
        </p>

      </div>

      <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center text-4xl shadow-xl">

        <FaLayerGroup />

      </div>

    </div>
  );
}

export default CategoryHeader;