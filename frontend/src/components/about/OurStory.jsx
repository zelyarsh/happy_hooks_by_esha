import storyImage from "../../assets/images/about/story.jpg";
import {
  FaHeart,
  FaGift,
  FaLeaf,
  FaStar,
} from "react-icons/fa";

function OurStory() {
  const features = [
    {
      icon: <FaHeart />,
      title: "Made With Love",
      text: "Every crochet piece is handcrafted carefully with passion and attention to detail.",
    },
    {
      icon: <FaGift />,
      title: "Perfect Gifts",
      text: "Unique handmade gifts for birthdays, anniversaries, graduations and every special moment.",
    },
    {
      icon: <FaLeaf />,
      title: "Premium Yarn",
      text: "We use soft, high-quality yarn that creates beautiful and long-lasting products.",
    },
    {
      icon: <FaStar />,
      title: "Unique Designs",
      text: "Every order is made individually so your gift feels truly one of a kind.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white">

      {/* Background Decorations */}

      <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-pink-100 blur-[120px] opacity-70"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-rose-100 blur-[140px] opacity-70"></div>

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Image */}

          <div
            data-aos="zoom-in"
            className="relative"
          >
            <div className="overflow-hidden rounded-[40px] shadow-2xl">

              <img
                src={storyImage}
                alt="Our Story"
                className="w-full h-[650px] object-cover transition duration-700 hover:scale-110"
              />

            </div>

            {/* Floating Badge */}

            <div className="absolute -bottom-8 -right-8 bg-white shadow-2xl rounded-3xl p-6">

              <h2 className="text-5xl font-bold text-pink-500">
                100%
              </h2>

              <p className="text-gray-600 mt-2">
                Handmade
              </p>

            </div>

          </div>

          {/* Text */}

          <div
            data-aos="fade-left"
          >

            <p className="uppercase tracking-[5px] text-pink-500 font-semibold">

              Our Story

            </p>

            <h2 className="text-5xl font-bold mt-5 leading-tight">

              Handmade Creations
              <br />

              That Last Forever

            </h2>

            <p className="text-gray-600 text-lg leading-9 mt-8">

              Happy Hooks by Esha started from a simple love for crochet and
              grew into a dream of creating meaningful handmade gifts.

              Every flower, bouquet, plushie and keychain is crafted with
              patience, creativity and care.

            </p>

            <p className="text-gray-600 text-lg leading-9 mt-6">

              We believe handmade gifts carry emotions that machine-made
              products never can. Every stitch tells a story, every bouquet
              celebrates a memory, and every customer becomes part of our
              journey.

            </p>

            {/* Feature Cards */}

            <div className="grid sm:grid-cols-2 gap-6 mt-12">

              {features.map((item, index) => (

                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group bg-pink-50 rounded-3xl p-6 hover:bg-pink-500 transition-all duration-500 hover:-translate-y-2 shadow-lg"
                >

                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-pink-500 text-2xl shadow-md group-hover:bg-pink-100">

                    {item.icon}

                  </div>

                  <h3 className="font-bold text-xl mt-5 group-hover:text-white">

                    {item.title}

                  </h3>

                  <p className="text-gray-600 mt-3 leading-7 group-hover:text-pink-100">

                    {item.text}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default OurStory;