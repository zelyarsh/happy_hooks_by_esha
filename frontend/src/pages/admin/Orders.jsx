import OrdersTable from "../../components/admin/orders/OrdersTable";
import { useOrders } from "../../context/OrderContext";
import { FaShoppingBag, FaClock, FaTruck, FaCheckCircle } from "react-icons/fa";

function Orders() {
  const { totalOrders, pendingOrders, shippedOrders, deliveredOrders } = useOrders();

  return (
    <div className="space-y-8">
      <div>
        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">Sales</p>
        <h1 className="text-4xl font-bold mt-2">Orders</h1>
        <p className="text-gray-500 mt-2">Manage customer orders.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow p-6"><FaShoppingBag className="text-pink-500 text-3xl"/><h2 className="text-3xl font-bold mt-4">{totalOrders}</h2><p className="text-gray-500">Total Orders</p></div>
        <div className="bg-white rounded-3xl shadow p-6"><FaClock className="text-yellow-500 text-3xl"/><h2 className="text-3xl font-bold mt-4">{pendingOrders}</h2><p className="text-gray-500">Pending</p></div>
        <div className="bg-white rounded-3xl shadow p-6"><FaTruck className="text-blue-500 text-3xl"/><h2 className="text-3xl font-bold mt-4">{shippedOrders}</h2><p className="text-gray-500">Shipped</p></div>
        <div className="bg-white rounded-3xl shadow p-6"><FaCheckCircle className="text-green-500 text-3xl"/><h2 className="text-3xl font-bold mt-4">{deliveredOrders}</h2><p className="text-gray-500">Delivered</p></div>
      </div>

      <OrdersTable/>
    </div>
  );
}

export default Orders;
