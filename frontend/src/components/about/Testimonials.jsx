import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ayesha Khan",
    city: "Lahore",
    review:
      "The crochet bouquet looked even more beautiful than the pictures. Highly recommended!",
  },
  {
    name: "Fatima Ali",
    city: "Karachi",
    review:
      "Amazing quality and fast delivery. My friend absolutely loved the gift.",
  },
  {
    name: "Hira Ahmed",
    city: "Islamabad",
    review:
      "Beautiful craftsmanship! You can really tell each piece is handmade with care.",
  },
];

function Testimonials() {
  return (
    <section className="bg-pink-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Loved By Our Customers
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition"
            >

              <div className="flex text-yellow-400 mb-6">

                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}

              </div>

              <p className="text-gray-600 leading-8 italic">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h3 className="font-bold text-xl">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.city}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;