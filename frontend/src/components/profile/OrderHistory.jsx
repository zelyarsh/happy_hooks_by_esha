import { FaBoxOpen, FaChevronRight } from "react-icons/fa";

const orders = [
  { id: "#HH1001", product: "Crochet Rose Bouquet", status: "Delivered", price: "Rs. 2,500", color: "bg-green-50 text-green-600 border-green-100" },
  { id: "#HH1002", product: "Sunflower Bouquet", status: "Processing", price: "Rs. 1,800", color: "bg-amber-50 text-amber-600 border-amber-100" },
  { id: "#HH1003", product: "Mini Teddy Plushie", status: "Shipped", price: "Rs. 1,200", color: "bg-blue-50 text-blue-600 border-blue-100" },
];

function OrderHistory() {
  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(244,63,94,0.03)] border border-pink-100/40 p-8" data-aos="fade-up">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Orders</h2>
        <p className="text-gray-400 text-sm mt-0.5">Monitor processing delivery updates</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-[0_10px_30px_rgba(244,63,94,0.04)] hover:border-pink-100/70 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-pink-50 text-pink-500 p-4 rounded-xl border border-pink-100/50 transform transition-transform duration-300 group-hover:scale-105">
                <FaBoxOpen size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 tracking-tight text-base sm:text-lg">
                  {order.product}
                </h3>
                <p className="text-gray-400 text-xs font-semibold mt-0.5">
                  ID: {order.id}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-0 pt-3 sm:pt-0 border-gray-50">
              <div className="sm:text-right">
                <p className="font-black text-pink-500 text-base sm:text-lg">
                  {order.price}
                </p>
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border mt-1 ${order.color}`}>
                  {order.status}
                </span>
              </div>
              <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-pink-50 hover:text-pink-500 transition-colors duration-200">
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;