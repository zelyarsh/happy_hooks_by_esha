import { FaShoppingBag, FaHeart, FaBox, FaStar, FaGift } from "react-icons/fa";

import ProfileInformation from "./ProfileInformation";
import OrderHistory from "./OrderHistory";
import AddressBook from "./AddressBook";
import AccountSettings from "./AccountSettings";

function ProfileOverview({ activeTab = "overview" }) {
  const cards = [
    { title: "Total Orders", value: "08", icon: <FaShoppingBag />, color: "from-pink-500 to-rose-500", bg: "bg-pink-50" },
    { title: "Wishlist Items", value: "12", icon: <FaHeart />, color: "from-rose-400 to-orange-400", bg: "bg-rose-50" },
    { title: "Delivered Packages", value: "06", icon: <FaBox />, color: "from-amber-400 to-orange-500", bg: "bg-amber-50" },
    { title: "Product Reviews", value: "04", icon: <FaStar />, color: "from-pink-400 to-pink-600", bg: "bg-pink-50" },
  ];

  // If a tab view is targeted from the sidebar link, cleanly filter out the rest
  if (activeTab === "orders") return <OrderHistory />;
  if (activeTab === "wishlist") return <div className="bg-white rounded-[32px] p-8 border border-pink-100/40 shadow-sm"> <h2 className="text-2xl font-black mb-4">Wishlist Items Preview</h2> <p className="text-gray-400">Your custom wishlist product components load inside this layout shell.</p> </div>;
  if (activeTab === "addresses") return <AddressBook />;
  if (activeTab === "settings") return <AccountSettings />;

  // Default Full-blown Master Overview Dashboard View
  return (
    <div className="lg:col-span-3 space-y-8">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-[26px] p-6 shadow-[0_12px_40px_rgba(244,63,94,0.03)] border border-pink-100/40 flex items-center gap-5 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(244,63,94,0.08)] transition-all duration-300 group cursor-pointer"
          >
            <div className={`p-4 rounded-2xl ${card.bg} text-transparent bg-clip-text bg-gradient-to-br ${card.color} text-2xl transform transition-transform duration-300 group-hover:scale-110`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">{card.value}</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-0.5">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[32px] p-7 shadow-[0_12px_40px_rgba(244,63,94,0.03)] border border-pink-100/40 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Spending Analytics</h3>
            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Total Spent:</span><span className="font-bold text-pink-600">Rs. 14,500</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Average Order:</span><span className="font-bold text-gray-800">Rs. 1,812</span></div>
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full h-2 bg-pink-50 rounded-full overflow-hidden"><div className="w-[75%] h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" /></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-[32px] p-7 text-white shadow-[0_15px_35px_rgba(244,63,94,0.15)] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 text-white/10 text-9xl transform -rotate-12 font-black"><FaGift /></div>
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-pink-100 tracking-tight">Reward Club Balance</h3>
              </div>
              <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/20">VIP Tier 1</span>
            </div>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tight">350</span>
            </div>
          </div>
          <div className="mt-6 relative z-10">
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[70%] h-full bg-white rounded-full" /></div>
          </div>
        </div>
      </div>

      <ProfileInformation />
      <OrderHistory />
      <AddressBook />
      <AccountSettings />
    </div>
  );
}

export default ProfileOverview;
