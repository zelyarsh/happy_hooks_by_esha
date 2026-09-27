import {
  FaPlus,
  FaSearch,
} from "react-icons/fa";

function SubCategoryToolbar({

  search,
  setSearch,
  onAdd,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center flex-wrap gap-4">

      <div className="relative w-full lg:w-96">

        <FaSearch className="absolute left-5 top-4 text-gray-400"/>

        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search Sub Categories..."

          className="w-full border rounded-xl py-3 pl-14 pr-4 focus:border-pink-500 outline-none"

        />

      </div>

      <button

        onClick={onAdd}

        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"

      >

        <FaPlus className="inline mr-2"/>

        Add Sub Category

      </button>

    </div>

  );

}

export default SubCategoryToolbar;