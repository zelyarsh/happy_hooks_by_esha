import {
  FaPlus,
  FaSearch,
} from "react-icons/fa";

function CategoryToolbar({

  search,
  setSearch,

  onAdd,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-wrap gap-4 justify-between items-center">

      <div className="relative w-full lg:w-96">

        <FaSearch className="absolute left-5 top-4 text-gray-400" />

        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search Categories..."

          className="w-full pl-14 pr-4 py-3 rounded-xl border focus:border-pink-500 outline-none"

        />

      </div>

      <button

        onClick={onAdd}

        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-7 py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center gap-3"

      >

        <FaPlus />

        Add Category

      </button>

    </div>

  );

}

export default CategoryToolbar;