import { useOrders } from "../../../context/OrderContext";

function RecentOrders() {
  const { orders, orderTotal } = useOrders();
  const recent = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      {recent.length === 0 ? (
        <p className="text-gray-400 py-8 text-center">No orders yet.</p>
      ) : (
        <table className="w-full">

          <thead>

            <tr className="text-left border-b">

              <th className="py-3">Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {recent.map((order) => (

              <tr
                key={order._id}
                className="border-b hover:bg-pink-50"
              >

                <td className="py-4">{order.orderNumber}</td>

                <td>{order.customerName}</td>

                <td>Rs. {orderTotal(order)}</td>

                <td>{order.orderStatus}</td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default RecentOrders;
