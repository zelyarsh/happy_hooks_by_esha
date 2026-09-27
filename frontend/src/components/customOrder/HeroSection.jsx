import { Link } from "react-router-dom";
import heroImage from "../../assets/images/banners/custom-hero.jpg";

function HeroSection() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-white to-rose-50"></div>

      {/* Decorative Circles */}

      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl"></div>

      <div className="absolute top-24 right-0 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl"></div>

      <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-pink-100 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-block bg-pink-100 text-pink-600 px-5 py-2 rounded-full text-sm font-semibold tracking-wide">

              ✨ Handmade Just For You

            </span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mt-8">

              Create Your

              <span className="block bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">

                Dream Crochet Gift

              </span>

            </h1>

            <p className="text-gray-600 text-lg leading-9 mt-8 max-w-xl">

              Have a special idea?

              We create personalized crochet bouquets,
              plushies, keychains, flower pots and gifts
              handcrafted with love exactly the way you imagine.

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="#custom-form"
                className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition duration-300"
              >
                Start Designing
              </a>

              <Link
                to="/shop"
                className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-full font-semibold hover:bg-pink-500 hover:text-white transition"
              >
                Explore Shop
              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>

                <h2 className="text-4xl font-bold text-pink-500">
                  500+
                </h2>

                <p className="text-gray-500 mt-2">
                  Happy Customers
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-pink-500">
                  100%
                </h2>

                <p className="text-gray-500 mt-2">
                  Handmade
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-pink-500">
                  24h
                </h2>

                <p className="text-gray-500 mt-2">
                  Response Time
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">

            {/* Pink Background Card */}

            <div className="absolute w-[430px] h-[430px] rounded-full bg-pink-100"></div>

            {/* Floating Image */}

            <img
              src={heroImage}
              alt="Custom Crochet"
              className="relative w-[420px] lg:w-[500px] drop-shadow-2xl animate-bounce"
              style={{
                animationDuration: "4s",
              }}
            />

            {/* Floating Cards */}

            <div className="absolute top-8 left-0 bg-white rounded-2xl shadow-xl px-6 py-4">

              <h4 className="font-bold text-pink-500">
                Premium Yarn
              </h4>

              <p className="text-sm text-gray-500">
                Soft & Long Lasting
              </p>

            </div>

            <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl px-6 py-4">

              <h4 className="font-bold text-pink-500">
                Custom Designs
              </h4>

              <p className="text-sm text-gray-500">
                Made For You
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;