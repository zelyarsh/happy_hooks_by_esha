import makerImage from "../../assets/images/about/maker.jpg";
import {
  FaHeart,
  FaAward,
  FaHandsHelping,
  FaSmile,
} from "react-icons/fa";

function MeetMaker() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-pink-50 via-white to-pink-50 overflow-hidden">

      {/* Background Decorations */}

      <div className="absolute -top-20 right-0 w-80 h-80 bg-pink-200/30 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200/30 rounded-full blur-[140px]"></div>

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}

          <div data-aos="fade-right">

            <p className="uppercase tracking-[5px] text-pink-500 font-semibold">
              Meet The Maker
            </p>

            <h2 className="text-5xl font-bold mt-5 leading-tight">
              Hi, I'm
              <span className="text-pink-500"> Esha</span> 👋
            </h2>

            <p className="text-gray-600 text-lg leading-9 mt-8">
              Happy Hooks by Esha began with a simple passion for crochet.
              What started as a creative hobby has grown into a small handmade
              business dedicated to creating meaningful gifts for people all
              across Pakistan.
            </p>

            <p className="text-gray-600 text-lg leading-9 mt-6">
              Every bouquet, plushie, flower and keychain is personally made
              by me using premium yarn and careful craftsmanship. My goal is
              to make every customer feel special by delivering products that
              create lasting memories.
            </p>

            {/* Achievement Cards */}

            <div className="grid sm:grid-cols-2 gap-6 mt-12">

              <div
                data-aos="zoom-in"
                className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition duration-500"
              >

                <FaHeart className="text-pink-500 text-3xl" />

                <h3 className="text-4xl font-bold mt-5">
                  500+
                </h3>

                <p className="text-gray-500 mt-2">
                  Happy Customers
                </p>

              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="100"
                className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition duration-500"
              >

                <FaAward className="text-pink-500 text-3xl" />

                <h3 className="text-4xl font-bold mt-5">
                  1000+
                </h3>

                <p className="text-gray-500 mt-2">
                  Handmade Products
                </p>

              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="200"
                className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition duration-500"
              >

                <FaHandsHelping className="text-pink-500 text-3xl" />

                <h3 className="text-4xl font-bold mt-5">
                  100%
                </h3>

                <p className="text-gray-500 mt-2">
                  Handmade With Love
                </p>

              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="300"
                className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition duration-500"
              >

                <FaSmile className="text-pink-500 text-3xl" />

                <h3 className="text-4xl font-bold mt-5">
                  5★
                </h3>

                <p className="text-gray-500 mt-2">
                  Customer Satisfaction
                </p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div
            data-aos="fade-left"
            className="relative flex justify-center"
          >

            {/* Image */}

            <div className="relative overflow-hidden rounded-[40px] shadow-2xl group">

              <img
                src={makerImage}
                alt="Esha"
                className="w-full max-w-lg object-cover transition duration-700 group-hover:scale-110"
              />

            </div>

            {/* Floating Card */}

            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="absolute bottom-10 -left-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl px-8 py-6"
            >

              <h3 className="text-3xl font-bold text-pink-500">
                Handmade
              </h3>

              <p className="text-gray-600 mt-2">
                Every order is personally crocheted with care.
              </p>

            </div>

            {/* Floating Badge */}

            <div
              className="absolute -top-6 -right-6 bg-pink-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-center shadow-xl animate-bounce"
            >

              <div>

                <h3 className="font-bold text-lg">
                  Since
                </h3>

                <p className="text-xl font-bold">
                  2024
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MeetMaker;