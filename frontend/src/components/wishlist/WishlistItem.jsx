import { FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useToast } from "../../context/ToastContext";
function WishlistItem({
  item,
  removeFromWishlist,
  addToCart,
}) {
    const { showToast } = useToast();
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      <div className="flex flex-col md:flex-row">

        {/* Image */}

        <div className="md:w-56 relative overflow-hidden">

          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 md:h-full object-cover hover:scale-105 transition duration-500"
          />

          <div className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
            <FaHeart />
            Saved
          </div>

        </div>

        {/* Content */}

        <div className="flex-1 p-8 flex flex-col justify-between">

          <div>

            <p className="uppercase tracking-widest text-pink-500 text-sm font-semibold">
              {item.category}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {item.name}
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              Handmade crochet product crafted with premium cotton yarn and finished with attention to every detail.
            </p>

            <h3 className="text-3xl font-bold text-pink-500 mt-6">
              Rs. {item.price.toLocaleString()}
            </h3>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-8">

            <button
             onClick={() => {
  addToCart(item);
  removeFromWishlist(item.id);
  showToast({
    type: "success",
    title: "Moved to Cart",
    message: item.name,
  });
}}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition shadow-lg"
            >
              <FaShoppingCart />

              Move To Cart
            </button>

            <button
             onClick={() => {
  removeFromWishlist(item.id);

  showToast({
    type: "warning",
    title: "Removed from Wishlist",
    message: item.name,
  });
}}
              className="px-6 py-4 border border-red-300 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition flex items-center gap-2"
            >
              <FaTrash />

              Remove
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WishlistItem;