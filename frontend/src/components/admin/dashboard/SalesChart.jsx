import { useEffect, useState } from "react";
import { getSalesAnalytics } from "../../../services/analyticsService";

function SalesChart() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSalesAnalytics()
      .then((data) => setSales(data.sales || []))
      .catch((err) => console.error("Failed to load sales analytics:", err));
  }, []);

  const maxOrders = Math.max(1, ...sales.map((s) => s.orders));

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Monthly Orders
      </h2>

      <div className="flex items-end gap-2 h-64 overflow-x-auto">

        {sales.map((item) => (

          <div
            key={item.month}
            className="flex flex-col items-center flex-1 min-w-[28px]"
          >

            <div
              className="bg-pink-500 rounded-t-xl w-full transition-all hover:bg-pink-600"
              style={{ height: `${(item.orders / maxOrders) * 200}px` }}
            />

            <p className="mt-3 text-xs">
              {item.month.slice(0, 3)}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SalesChart;
