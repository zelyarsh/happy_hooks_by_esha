import CustomerTable from "../../components/admin/customers/CustomerTable";
import { useCustomers } from "../../context/CustomerContext";
import { FaUsers, FaUserCheck, FaUserPlus, FaShoppingBag } from "react-icons/fa";

function Customers() {
  const { totalCustomers, activeCustomers, newCustomers, totalOrdersFromCustomers } = useCustomers();

  return (
    <div className="space-y-8">
      <div>
        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">Customers</p>
        <h1 className="text-4xl font-bold mt-2">Customer Management</h1>
        <p className="text-gray-500 mt-2">View and manage registered customers.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow p-6"><FaUsers className="text-pink-500 text-3xl"/><h2 className="text-3xl font-bold mt-4">{totalCustomers}</h2><p className="text-gray-500">Total Customers</p></div>
        <div className="bg-white rounded-3xl shadow p-6"><FaUserCheck className="text-green-500 text-3xl"/><h2 className="text-3xl font-bold mt-4">{activeCustomers}</h2><p className="text-gray-500">Active</p></div>
        <div className="bg-white rounded-3xl shadow p-6"><FaUserPlus className="text-blue-500 text-3xl"/><h2 className="text-3xl font-bold mt-4">{newCustomers}</h2><p className="text-gray-500">New This Month</p></div>
        <div className="bg-white rounded-3xl shadow p-6"><FaShoppingBag className="text-orange-500 text-3xl"/><h2 className="text-3xl font-bold mt-4">{totalOrdersFromCustomers}</h2><p className="text-gray-500">Orders</p></div>
      </div>

      <CustomerTable />
    </div>
  );
}

export default Customers;
