import { FaMapMarkerAlt, FaEdit, FaTrashAlt } from "react-icons/fa";

function AddressBook() {
  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(244,63,94,0.03)] border border-pink-100/40 p-8" data-aos="fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Saved Addresses</h2>
          <p className="text-gray-400 text-sm mt-0.5">Manage delivery destinations</p>
        </div>
        <button className="border border-pink-200 text-pink-500 font-bold px-5 py-2.5 rounded-full text-xs hover:bg-pink-50/50 transition-colors duration-300">
          Add New Address
        </button>
      </div>

      <div className="border border-pink-100/60 bg-gradient-to-br from-pink-50/10 to-transparent rounded-2xl p-6 relative group overflow-hidden">
        {/* Decorative background tag */}
        <div className="absolute right-0 top-0 bg-pink-100 text-pink-600 font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
          Default
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-pink-50 border border-pink-100 rounded-xl text-pink-500">
            <FaMapMarkerAlt size={18} />
          </div>
          <h3 className="font-extrabold text-gray-800 text-lg tracking-tight">
            Home Address
          </h3>
        </div>

        <p className="mt-4 text-gray-500 text-sm font-medium leading-relaxed max-w-sm">
          House #123, Street 5, <br />
          Gujrat, Punjab, Pakistan
        </p>

        <div className="mt-6 flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 bg-gray-900 text-white font-bold px-4 py-2.5 rounded-full text-xs hover:bg-gray-800 transform active:scale-[0.97] transition-all duration-200">
            <FaEdit size={12} /> Edit Address
          </button>
          <button className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors duration-200">
            <FaTrashAlt size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressBook;