import {
  FaHeart,
  FaLeaf,
  FaGift,
  FaTruck,
} from "react-icons/fa";

const features = [
  {
    icon: <FaHeart size={32} />,
    title: "Handmade With Love",
    description:
      "Every crochet product is individually handcrafted with attention to detail.",
  },
  {
    icon: <FaLeaf size={32} />,
    title: "Premium Materials",
    description:
      "We use soft, high-quality yarn for beautiful and durable creations.",
  },
  {
    icon: <FaGift size={32} />,
    title: "Perfect Gifts",
    description:
      "Ideal for birthdays, anniversaries, weddings and every special occasion.",
  },
  {
    icon: <FaTruck size={32} />,
    title: "Nationwide Delivery",
    description:
      "Fast and secure delivery across Pakistan.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-pink-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-4">
            More Than Just Crochet
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-3 transition duration-300"
            >

              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-bold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-7 mt-4">
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