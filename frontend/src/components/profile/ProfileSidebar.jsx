import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaCamera
} from "react-icons/fa";

function ProfileSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "overview", label: "Profile Overview", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaShoppingBag /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div 
      className="bg-white/80 backdrop-blur-md rounded-[32px] shadow-[0_20px_50px_rgba(244,63,94,0.04)] border border-pink-100/60 p-8 h-fit relative overflow-hidden"
      data-aos="fade-right"
    >
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="text-center relative z-10">
        <div className="relative w-28 h-28 mx-auto group/avatar cursor-pointer">
          <img
            src="https://ui-avatars.com/api/?name=Happy+Hooks&background=f472b6&color=fff&size=200"
            alt="Profile"
            className="w-full h-full rounded-full object-cover ring-4 ring-pink-100 shadow-md transition-transform duration-500 group-hover/avatar:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300">
            <FaCamera className="text-white text-xl" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-gray-900 mt-5 tracking-tight">
          Happy Customer 👋
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            Crochet Lover
          </span>
          <span className="text-xs font-medium text-gray-400">
            Member Since 2026
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100 my-6"></div>

      {/* Navigation List Elements hooked into activeTab State */}
      <ul className="space-y-2 relative z-10">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id || (item.id === "overview" && activeTab === "");
          return (
            <li
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl font-semibold cursor-pointer transition-all duration-300 transform active:scale-[0.99] group ${
                isActive
                  ? "bg-pink-50/80 text-pink-600 font-bold shadow-sm shadow-pink-100/50"
                  : "text-gray-600 hover:bg-pink-50/40 hover:text-pink-600"
              }`}
            >
              <span className={`${isActive ? "text-pink-500" : "text-gray-400 group-hover:text-pink-500"} text-lg transition-colors`}>
                {item.icon}
              </span>
              {item.label}
            </li>
          );
        })}

        <div className="border-t border-gray-50 my-4"></div>

        <li className="flex items-center gap-3.5 text-rose-500 font-bold hover:bg-rose-50 rounded-2xl px-5 py-4 cursor-pointer transition-all duration-300 transform active:scale-[0.98]">
          <FaSignOutAlt className="text-lg" />
          Logout
        </li>
      </ul>
    </div>
  );
}

export default ProfileSidebar;