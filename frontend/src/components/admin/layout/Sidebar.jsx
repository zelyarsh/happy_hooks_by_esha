import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaLayerGroup,
  FaTags,
  FaShoppingBag,
  FaUsers,
  FaImages,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaStar,
  FaMagic,
  FaPhotoVideo,
} from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    path: "/admin/dashboard",
  },

  {
    title: "Categories",
    icon: <FaLayerGroup />,
    path: "/admin/categories",
  },

  {
    title: "Sub Categories",
    icon: <FaTags />,
    path: "/admin/subcategories",
  },

  {
    title: "Products",
    icon: <FaBoxOpen />,
    path: "/admin/products",
  },

  {
    title: "New Arrivals",
    icon: <FaMagic />,
    path: "/admin/new-arrivals",
  },

  {
    title: "Orders",
    icon: <FaShoppingBag />,
    path: "/admin/orders",
  },

  {
    title: "Customers",
    icon: <FaUsers />,
    path: "/admin/customers",
  },

  {
    title: "Homepage",
    icon: <FaImages />,
    path: "/admin/homepage",
  },

  {
    title: "Media Library",
    icon: <FaPhotoVideo />,
    path: "/admin/media",
  },

  {
    title: "Reviews",
    icon: <FaStar />,
    path: "/admin/reviews",
  },

  {
    title: "Analytics",
    icon: <FaChartBar />,
    path: "/admin/analytics",
  },

  {
    title: "Settings",
    icon: <FaCog />,
    path: "/admin/settings",
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-white to-pink-50/20 shadow-[4px_0_24px_rgba(244,63,94,0.04)] border-r border-pink-100/60 flex flex-col z-50">

      <div className="p-8 pb-6 border-b border-pink-100/40">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-pink-500 animate-pulse" />

          <h1 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">

            Happy Hooks

          </h1>

        </div>

        <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">

          Admin Console

        </p>

      </div>

      <nav
        className="flex-1 overflow-y-auto px-4 py-5 space-y-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >

        {menu.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`
            }
          >

            <span className="text-lg">

              {item.icon}

            </span>

            <span className="font-medium">

              {item.title}

            </span>

          </NavLink>

        ))}

      </nav>

      <div className="p-6 border-t">

        <button className="w-full bg-red-50 hover:bg-red-500 hover:text-white transition rounded-2xl py-3 flex justify-center items-center gap-3 font-semibold text-red-500">

          <FaSignOutAlt />

          Sign Out

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;