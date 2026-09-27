import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {
  return (
    <header className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">

      <div>

        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-500 mt-1">
          Welcome back, Admin 👋
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:border-pink-500"
          />

        </div>

        <button className="relative bg-pink-50 p-4 rounded-full hover:bg-pink-100 transition">

          <FaBell />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        <div className="flex items-center gap-3 bg-pink-50 px-5 py-2 rounded-full">

          <FaUserCircle
            size={40}
            className="text-pink-500"
          />

          <div>

            <h4 className="font-semibold">
              Admin
            </h4>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;