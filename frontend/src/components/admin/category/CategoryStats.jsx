import {
  FaLayerGroup,
  FaCheckCircle,
  FaStar,
  FaBan,
} from "react-icons/fa";

import { useCategories } from "../../../context/CategoryContext";

function CategoryStats() {

  const {
    totalCategories,
    activeCategories,
    inactiveCategories,
    featuredCategories,
  } = useCategories();

  const stats = [

    {
      title: "Total Categories",
      value: totalCategories,
      color: "bg-pink-500",
      icon: <FaLayerGroup />,
    },

    {
      title: "Active",
      value: activeCategories,
      color: "bg-green-500",
      icon: <FaCheckCircle />,
    },

    {
      title: "Featured",
      value: featuredCategories,
      color: "bg-yellow-500",
      icon: <FaStar />,
    },

    {
      title: "Inactive",
      value: inactiveCategories,
      color: "bg-red-500",
      icon: <FaBan />,
    },

  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {stats.map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">

                {item.title}

              </p>

              <h2 className="text-4xl font-black mt-3">

                {item.value}

              </h2>

            </div>

            <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl`}>

              {item.icon}

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default CategoryStats;