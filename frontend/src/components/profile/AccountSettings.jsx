import { useState } from "react";
import { FaLock, FaBell, FaEnvelope } from "react-icons/fa";

function AccountSettings() {
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(244,63,94,0.03)] border border-pink-100/40 p-8" data-aos="fade-up">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Account Settings</h2>
        <p className="text-gray-400 text-sm mt-0.5">Control your authentication and mailing settings</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Form: Password Module */}
        <div className="lg:col-span-3 space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-8">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <FaLock className="text-pink-500" /> Security Updates
          </h3>
          {["current", "new", "confirm"].map((field) => (
            <input
              key={field}
              type="password"
              name={field}
              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} Password`}
              value={passwords[field]}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100/50 transition-all duration-300"
            />
          ))}
          <button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-[0_5px_15px_rgba(244,63,94,0.25)] text-white font-bold px-6 py-3.5 rounded-full text-sm mt-2 transform active:scale-[0.98] transition-all duration-300">
            Update Password
          </button>
        </div>

        {/* Right Toggle List: Preferences Module */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaBell className="text-pink-500" /> Notifications
            </h3>
            <label className="flex items-center gap-3 cursor-pointer select-none group text-sm font-semibold text-gray-600">
              <input type="checkbox" defaultChecked className="w-4.5 h-4.5 text-pink-500 rounded focus:ring-pink-400 accent-pink-500 transform transition group-hover:scale-105" />
              <span>Order status notifications</span>
            </label>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaEnvelope className="text-pink-500" /> Marketing Preferences
            </h3>
            <label className="flex items-center gap-3 cursor-pointer select-none group text-sm font-semibold text-gray-600">
              <input type="checkbox" className="w-4.5 h-4.5 text-pink-500 rounded focus:ring-pink-400 accent-pink-500 transform transition group-hover:scale-105" />
              <span>Receive weekly crochet deals</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;