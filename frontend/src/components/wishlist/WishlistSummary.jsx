import {
  FaHeart,
  FaTrash,
  FaGift,
  FaTruck,
} from "react-icons/fa";

function WishlistSummary({
  count,
  clearWishlist,
}) {
  return (
    <div className="sticky top-28">

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-8 text-white">

          <p className="uppercase tracking-[4px] text-sm opacity-90">
            Wishlist Summary
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Saved Items
          </h2>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="flex justify-between items-center border-b pb-5">

            <span className="text-gray-600">
              Total Saved
            </span>

            <span className="text-2xl font-bold text-pink-500">
              {count}
            </span>

          </div>

          {/* Handmade Note */}

          <div className="mt-8 bg-pink-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <FaHeart className="text-pink-500 mt-1" />

              <div>

                <h3 className="font-semibold">
                  Handmade with Love
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Every crochet product is carefully handcrafted
                  using premium quality yarn.
                </p>

              </div>

            </div>

          </div>

          {/* Delivery */}

          <div className="mt-5 bg-rose-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <FaTruck className="text-pink-500 mt-1" />

              <div>

                <h3 className="font-semibold">
                  Nationwide Delivery
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Safe and secure shipping all across Pakistan.
                </p>

              </div>

            </div>

          </div>

          {/* Gift */}

          <div className="mt-5 bg-pink-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <FaGift className="text-pink-500 mt-1" />

              <div>

                <h3 className="font-semibold">
                  Perfect for Gifting
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Beautifully packed and ready to surprise your loved ones.
                </p>

              </div>

            </div>

          </div>

          {/* Clear Button */}

          <button
            onClick={clearWishlist}
            className="mt-8 w-full border-2 border-red-400 text-red-500 py-4 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300 flex justify-center items-center gap-3"
          >
            <FaTrash />

            Clear Wishlist
          </button>

        </div>

      </div>

    </div>
  );
}

export default WishlistSummary;