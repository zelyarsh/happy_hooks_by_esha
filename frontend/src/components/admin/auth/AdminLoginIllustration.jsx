import { FaHeart } from "react-icons/fa";

function AdminLoginIllustration() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-pink-500 via-rose-400 to-pink-300 text-white p-16 relative overflow-hidden">

      <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-16 -left-16"></div>
      <div className="absolute w-96 h-96 bg-white/10 rounded-full -bottom-32 -right-24"></div>

      <FaHeart className="text-7xl mb-8 animate-pulse" />

      <h2 className="text-5xl font-bold text-center leading-tight">
        Happy Hooks
        <br />
        Admin Panel
      </h2>

      <p className="mt-8 text-lg text-center max-w-md text-pink-50 leading-8">
        Manage products, categories, orders, customers,
        homepage content and everything related to your
        crochet store from one beautiful dashboard.
      </p>

    </div>
  );
}

export default AdminLoginIllustration;