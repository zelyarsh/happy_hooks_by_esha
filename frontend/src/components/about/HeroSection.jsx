import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import aboutBanner from "../../assets/images/about/about.png";

function HeroSection() {
  return (
    <section
      className="relative h-[90vh] flex items-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${aboutBanner})`,
      }}
    >
      {/* Dark Gradient Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20"></div>

      {/* Decorative Circles */}

      <div className="absolute top-20 right-24 w-40 h-40 rounded-full bg-pink-400/20 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-20 left-16 w-60 h-60 rounded-full bg-rose-300/20 blur-3xl animate-pulse"></div>

      {/* Floating Hearts */}

      <FaHeart className="absolute top-28 left-24 text-pink-300 text-3xl animate-bounce opacity-70" />

      <FaHeart className="absolute bottom-36 right-24 text-white text-4xl animate-pulse opacity-70" />

      <FaHeart className="absolute top-1/2 right-1/3 text-pink-200 text-2xl animate-bounce delay-300" />

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

        <div className="max-w-3xl">

          <span
            data-aos="fade-down"
            className="inline-block bg-pink-500 px-6 py-3 rounded-full uppercase tracking-[4px] text-sm font-semibold text-white shadow-lg"
          >
            Handmade With Love
          </span>

          <h1
            data-aos="fade-up"
            className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight text-white"
          >
            Every Stitch
            <br />

            Tells A Story
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-8 text-lg md:text-xl leading-9 text-gray-200 max-w-2xl"
          >
            Welcome to <strong>Happy Hooks by Esha</strong>, where every
            crochet flower, bouquet, plushie and handmade gift is crafted
            with patience, creativity and love. We don't just make crochet;
            we create memories that last forever.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-wrap gap-5 mt-12"
          >
            <Link
              to="/shop"
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold transition duration-300 shadow-xl hover:scale-105"
            >
              Shop Collection
            </Link>

            <Link
              to="/custom-order"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold transition duration-300"
            >
              Design Your Own
            </Link>
          </div>

          {/* Stats */}

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="grid grid-cols-3 gap-8 mt-16"
          >
            <div>
              <h2 className="text-4xl font-bold text-pink-300">500+</h2>
<br />
<br />
              <p className="text-gray-300 mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-pink-300">1000+</h2>

              <p className="text-gray-300 mt-2">
                Handmade Gifts
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-pink-300">100%</h2>

              <p className="text-gray-300 mt-2">
                Handmade
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;