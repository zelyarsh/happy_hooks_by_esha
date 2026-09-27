import { Link } from "react-router-dom";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";

function EmptyCart() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-pink-50/50 to-white px-6">

      <div className="max-w-2xl w-full bg-white rounded-[35px] shadow-2xl p-12 text-center">

        {/* Icon */}

        <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 flex items-center justify-center shadow-xl animate-pulse">

          <FaShoppingBag
            size={50}
            className="text-white"
          />

        </div>

        {/* Heading */}

        <h1 className="text-5xl font-bold mt-10">

          Your Shopping Bag

          <br />

          is Empty

        </h1>

        {/* Description */}

        <p className="mt-6 text-gray-600 text-lg leading-8">

          It looks like you haven't added any handmade crochet
          products yet.

          <br />

          Explore our beautiful collection and find something
          special made with love.

        </p>

        {/* Button */}

        <Link
          to="/shop"
          className="inline-flex items-center gap-3 mt-10 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-10 py-5 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300"
        >

          Explore Collection

          <FaArrowRight />

        </Link>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-6 mt-14">

          <div className="bg-pink-50 rounded-2xl p-6">

            <div className="text-4xl">

              🧶

            </div>

            <h3 className="font-bold mt-4">

              Handmade

            </h3>

            <p className="text-sm text-gray-500 mt-2">

              Every product is crafted with care.

            </p>

          </div>

          <div className="bg-pink-50 rounded-2xl p-6">

            <div className="text-4xl">

              🎁

            </div>

            <h3 className="font-bold mt-4">

              Perfect Gifts

            </h3>

            <p className="text-sm text-gray-500 mt-2">

              Beautiful gifts for every occasion.

            </p>

          </div>

          <div className="bg-pink-50 rounded-2xl p-6">

            <div className="text-4xl">

              🚚

            </div>

            <h3 className="font-bold mt-4">

              Fast Delivery

            </h3>

            <p className="text-sm text-gray-500 mt-2">

              Delivery available all across Pakistan.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default EmptyCart;