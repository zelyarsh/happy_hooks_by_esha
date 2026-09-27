import { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaUsers,
  FaBoxes,
  FaDollarSign,
} from "react-icons/fa";
import { getDashboardStats } from "../../../services/analyticsService";

function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then((data) => setStats(data.stats))
      .catch((err) => console.error("Failed to load dashboard stats:", err));
  }, []);

  const items = [
    {
      title: "Revenue",
      value: `Rs. ${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      icon: <FaDollarSign />,
      color: "bg-green-500",
    },
    {
      title: "Orders",
      value: stats?.totalOrders ?? 0,
      icon: <FaShoppingBag />,
      color: "bg-pink-500",
    },
    {
      title: "Customers",
      value: stats?.totalCustomers ?? 0,
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Products",
      value: stats?.totalProducts ?? 0,
      icon: <FaBoxes />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {items.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {item.value}
              </h2>

            </div>

            <div
              className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
            >
              {item.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;
