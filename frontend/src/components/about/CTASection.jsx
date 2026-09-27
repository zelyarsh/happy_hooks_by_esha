import { Link } from "react-router-dom";
import { FaShoppingBag, FaMagic } from "react-icons/fa";

function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">

      {/* Background Decorations */}

      <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div
          data-aos="zoom-in"
          className="bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/20 shadow-2xl p-12 lg:p-16 text-center"
        >

          <span className="inline-block bg-white text-pink-600 px-6 py-2 rounded-full uppercase tracking-[4px] text-sm font-semibold">
            Handmade With Love
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-white mt-8 leading-tight">
            Ready To Make
            <br />
            Someone Smile?
          </h2>

          <p className="mt-8 text-white/90 text-lg leading-8 max-w-3xl mx-auto">
            Whether you're looking for the perfect handmade crochet gift
            or want to create something completely unique, we're here to
            turn your ideas into beautiful handmade memories.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-wrap justify-center gap-6 mt-12"
          >

            <Link
              to="/shop"
              className="flex items-center gap-3 bg-white text-pink-600 px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition duration-300"
            >
              <FaShoppingBag />
              Shop Collection
            </Link>

            <Link
              to="/custom-order"
              className="flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition duration-300"
            >
              <FaMagic />
              Design Your Own
            </Link>

          </div>

          {/* Bottom Text */}

          <p className="mt-10 text-white/80 text-sm">
            ❤️ Every order is handmade specially for you.
          </p>

        </div>

      </div>

    </section>
  );
}

export default CTASection;