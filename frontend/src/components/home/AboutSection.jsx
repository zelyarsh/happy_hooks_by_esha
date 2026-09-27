import { Link } from "react-router-dom";
import {
  FaHeart,
  FaGift,
  FaLeaf,
} from "react-icons/fa";

import mainImage from "../../assets/images/about/about.png";
import smallImage1 from "../../assets/images/about/small1.jpg";
import smallImage2 from "../../assets/images/about/small2.jpg";

function AboutSection() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-pink-50 via-white to-white">

      {/* Decorative Background */}
      <div className="absolute left-10 top-32 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl"></div>

      <div className="absolute right-10 bottom-20 w-60 h-60 bg-rose-100 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE */}

        <div
          className="relative"
          data-aos="fade-right"
        >

          {/* Main Image */}

          <div className="rounded-[40px] overflow-hidden shadow-2xl group">

            <img
              src={mainImage}
              alt="Happy Hooks"
              className="w-full h-[620px] object-cover transition duration-700 group-hover:scale-105"
            />

          </div>

          {/* Handmade Badge */}

          <div className="absolute bottom-36 right-[-30px] bg-white rounded-full shadow-xl w-40 h-40 flex flex-col justify-center items-center border-4 border-pink-100 animate-pulse">

            <FaHeart className="text-pink-500 text-3xl mb-2" />

            <p className="text-sm uppercase tracking-widest text-gray-500">
              Handmade
            </p>

            <span className="font-bold text-pink-500">
              With Love
            </span>

          </div>

          {/* Floating Image 1 */}

          <div
            className="absolute -bottom-8 left-10 bg-white rounded-3xl p-2 shadow-2xl rotate-[-8deg] hover:rotate-0 transition duration-500"
            data-aos="fade-up"
          >

            <img
              src={smallImage1}
              alt=""
              className="w-44 h-44 rounded-2xl object-cover"
            />

          </div>

          {/* Floating Image 2 */}

          <div
            className="absolute bottom-0 right-16 bg-white rounded-3xl p-2 shadow-2xl rotate-[8deg] hover:rotate-0 transition duration-500"
            data-aos="zoom-in"
          >

            <img
              src={smallImage2}
              alt=""
              className="w-44 h-44 rounded-2xl object-cover"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div data-aos="fade-left">

          <p className="uppercase tracking-[6px] text-pink-500 font-semibold flex items-center gap-2">

            <FaHeart />

            OUR STORY

          </p>

          <h2 className="text-6xl font-bold mt-5 leading-tight text-gray-900">

            About Our Brand

          </h2>

          <div className="w-44 h-1 bg-pink-400 rounded-full mt-6"></div>

          <p className="mt-10 text-gray-600 leading-9 text-lg">

            Happy Hooks By Esha was born from a passion for crochet
            and the joy of creating meaningful handmade gifts.
            Every bouquet, plushie, flower and keychain is
            carefully handcrafted using premium quality yarn,
            bringing warmth and happiness to every special occasion.

          </p>

          {/* FEATURES */}

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <div className="text-center group">

              <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mx-auto text-pink-500 text-3xl group-hover:scale-110 transition">

                <FaHeart />

              </div>

              <h4 className="font-bold text-xl mt-5">

                Handmade

              </h4>

              <p className="text-gray-500 mt-3">

                Crafted with love & attention.

              </p>

            </div>

            <div className="text-center group">

              <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mx-auto text-pink-500 text-3xl group-hover:scale-110 transition">

                <FaLeaf />

              </div>

              <h4 className="font-bold text-xl mt-5">

                Premium Yarn

              </h4>

              <p className="text-gray-500 mt-3">

                Soft, durable and elegant.

              </p>

            </div>

            <div className="text-center group">

              <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mx-auto text-pink-500 text-3xl group-hover:scale-110 transition">

                <FaGift />

              </div>

              <h4 className="font-bold text-xl mt-5">

                Perfect Gifts

              </h4>

              <p className="text-gray-500 mt-3">

                Made for every celebration.

              </p>

            </div>

          </div>

          {/* BUTTON */}

          <Link
            to="/about"
            className="inline-flex items-center gap-3 mt-14 bg-gradient-to-r from-pink-500 to-rose-400 hover:scale-105 transition duration-300 text-white px-10 py-5 rounded-full shadow-xl font-semibold text-lg"
          >

            Learn More About Us

            →

          </Link>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;