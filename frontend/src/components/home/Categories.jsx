import { Link } from "react-router-dom";

import flowers from "../../assets/images/categories/flowers.jpeg";
import bouquets from "../../assets/images/categories/bouquet.jpeg";
import plushies from "../../assets/images/categories/plushies.jpeg";
import keychains from "../../assets/images/categories/keychain.png";

const categories = [
  {
    id: 1,
    name: "Flowers",
    image: flowers,
  },
  {
    id: 2,
    name: "Bouquets",
    image: bouquets,
  },
  {
    id: 3,
    name: "Plushies",
    image: plushies,
  },
  {
    id: 4,
    name: "Keychains",
    image: keychains,
  },
];

function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-pink-500 uppercase tracking-[4px] font-semibold">
            Browse Collection
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Shop By Category
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {categories.map((category) => (

            <Link
              key={category.id}
              to="/shop"
              className="group relative overflow-hidden rounded-3xl shadow-lg"
            >

              <img
                src={category.image}
                alt={category.name}
                className="w-full h-96 object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>

              <div className="absolute bottom-6 left-6">

                <h3 className="text-white text-3xl font-bold">
                  {category.name}
                </h3>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;