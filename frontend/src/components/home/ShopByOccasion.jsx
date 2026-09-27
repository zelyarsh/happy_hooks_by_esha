import { Link } from "react-router-dom";

import birthday from "../../assets/images/occasions/birthday.webp";
import wedding from "../../assets/images/occasions/wedding.jpg";
import baby from "../../assets/images/occasions/baby.jpg";
import anniversary from "../../assets/images/occasions/anniversary.jpg";

const occasions = [
  {
    title: "Birthday Gifts",
    image: birthday,
    link: "/shop",
  },
  {
    title: "Wedding Gifts",
    image: wedding,
    link: "/shop",
  },
  {
    title: "Baby Shower",
    image: baby,
    link: "/shop",
  },
  {
    title: "Anniversary",
    image: anniversary,
    link: "/shop",
  },
];

function ShopByOccasion() {
  return (
    <section className="py-24 bg-pink-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
            Gift Ideas
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Shop By Occasion
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Thoughtful handmade crochet gifts designed for every
            special moment in life.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {occasions.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >

              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              <div className="bg-white p-6 text-center">

                <h3 className="text-2xl font-bold group-hover:text-pink-500 transition">
                  {item.title}
                </h3>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}

export default ShopByOccasion;