import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import WishlistItem from "../components/wishlist/WishlistItem";
import WishlistSummary from "../components/wishlist/WishlistSummary";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <section className="bg-gradient-to-b from-pink-50/40 to-white min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">

          <div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium"
            >
              <FaArrowLeft />

              Continue Shopping

            </Link>

            <h1 className="text-5xl font-bold mt-4">
              My Wishlist
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Save your favourite handmade crochet products.
            </p>

          </div>

          <div className="mt-6 lg:mt-0 bg-white rounded-3xl shadow-md px-6 py-4">

            <p className="text-gray-500">
              Wishlist Items
            </p>

            <h2 className="text-3xl font-bold text-pink-500">
              {wishlistItems.length}
            </h2>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-8">

            {wishlistItems.map((item) => (

              <WishlistItem
                key={item.id}
                item={item}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
              />

            ))}

          </div>

          <WishlistSummary
            count={wishlistItems.length}
            clearWishlist={clearWishlist}
          />

        </div>

      </div>

    </section>
  );
}

export default Wishlist;