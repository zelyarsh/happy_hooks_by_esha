import {
  FaTags,
  FaCheckCircle,
  FaStar,
  FaBan,
} from "react-icons/fa";

import { useSubCategories } from "../../../context/SubCategoryContext";

function SubCategoryStats() {

  const {
    total,
    active,
    featured,
    inactive,
  } = useSubCategories();

  const stats = [

    {
      title: "Total",
      value: total,
      icon: <FaTags />,
      color: "bg-pink-500",
    },

    {
      title: "Active",
      value: active,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },

    {
      title: "Featured",
      value: featured,
      icon: <FaStar />,
      color: "bg-yellow-500",
    },

    {
      title: "Inactive",
      value: inactive,
      icon: <FaBan />,
      color: "bg-red-500",
    },

  ];

  return (

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {stats.map((item)=>(

        <div
          key={item.title}
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
        >

          <div className="flex justify-between">

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

export default SubCategoryStats;