import { Link } from "react-router-dom";
import { FaHeartBroken, FaArrowRight, FaGift } from "react-icons/fa";

function EmptyWishlist() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white flex items-center justify-center px-6">

      <div className="max-w-3xl w-full text-center">

        {/* Icon */}

        <div className="mx-auto w-36 h-36 rounded-full bg-pink-100 flex items-center justify-center shadow-lg animate-pulse">

          <FaHeartBroken className="text-7xl text-pink-500" />

        </div>

        {/* Heading */}

        <h1 className="text-5xl font-bold mt-10">
          Your Wishlist is Empty
        </h1>

        <p className="text-gray-500 text-lg leading-8 mt-6 max-w-2xl mx-auto">
          Save your favourite handmade crochet creations so you can
          easily find them later. Browse our beautiful collection and
          add the products you love.
        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">

          <Link
            to="/shop"
            className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-3"
          >
            Browse Collection

            <FaArrowRight />
          </Link>

          <Link
            to="/custom-order"
            className="border-2 border-pink-500 text-pink-500 px-10 py-4 rounded-full font-semibold hover:bg-pink-500 hover:text-white transition flex items-center justify-center gap-3"
          >
            <FaGift />

            Custom Order
          </Link>

        </div>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-6 mt-20">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="text-5xl">🧶</div>

            <h3 className="text-xl font-bold mt-5">
              Handmade
            </h3>

            <p className="text-gray-500 mt-3">
              Carefully crocheted with premium cotton yarn.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="text-5xl">🚚</div>

            <h3 className="text-xl font-bold mt-5">
              Nationwide Delivery
            </h3>

            <p className="text-gray-500 mt-3">
              Fast delivery across Pakistan.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="text-5xl">🎁</div>

            <h3 className="text-xl font-bold mt-5">
              Gift Ready
            </h3>

            <p className="text-gray-500 mt-3">
              Beautiful packaging for every order.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default EmptyWishlist;