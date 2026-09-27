import {
  FaHeart,
  FaGift,
  FaTruck,
  FaLeaf,
} from "react-icons/fa";

const features = [
  {
    icon: <FaHeart />,
    title: "Handmade with Love",
    description:
      "Every crochet piece is carefully handcrafted with attention to every stitch.",
  },
  {
    icon: <FaLeaf />,
    title: "Premium Quality",
    description:
      "Made using soft, durable, and high-quality yarn for lasting beauty.",
  },
  {
    icon: <FaGift />,
    title: "Perfect for Gifts",
    description:
      "Unique handmade gifts for birthdays, weddings, baby showers, and special occasions.",
  },
  {
    icon: <FaTruck />,
    title: "Nationwide Delivery",
    description:
      "Fast and secure shipping available across Pakistan.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-pink-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-pink-500 uppercase tracking-[4px] font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Crafted with Passion,
            <br />
            Designed to Impress
          </h2>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Every creation from Happy Hooks By Esha is designed
            to bring joy, warmth, and lasting memories.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow hover:-translate-y-3 hover:shadow-xl transition-all duration-300"
            >

              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl text-pink-500 mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;