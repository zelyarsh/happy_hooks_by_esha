import { useEffect, useState } from "react";
import { getSalesAnalytics } from "../../../services/analyticsService";

function RevenueChart() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSalesAnalytics()
      .then((data) => setSales(data.sales || []))
      .catch((err) => console.error("Failed to load sales analytics:", err));
  }, []);

  const maxRevenue = Math.max(1, ...sales.map((s) => s.revenue));

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Revenue Growth ({new Date().getFullYear()})
      </h2>

      <div className="flex justify-between overflow-x-auto gap-3">

        {sales.map((item) => (

          <div
            key={item.month}
            className="text-center flex-1 min-w-[36px]"
          >

            <div
              className="w-4 bg-gradient-to-t from-pink-500 to-pink-200 rounded-full mx-auto transition-all duration-300"
              style={{ height: `${Math.max(8, (item.revenue / maxRevenue) * 130)}px` }}
            ></div>

            <p className="mt-4 text-gray-600 text-xs">
              {item.month.slice(0, 3)}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RevenueChart;
