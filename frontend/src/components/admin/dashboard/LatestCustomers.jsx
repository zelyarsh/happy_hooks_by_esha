import { useCustomers } from "../../../context/CustomerContext";

function LatestCustomers() {
  const { customers } = useCustomers();

  const latest = [...customers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Latest Customers
      </h2>

      {latest.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No customers yet.</p>
      ) : (
        latest.map((customer) => (

          <div
            key={customer._id}
            className="flex items-center justify-between py-4 border-b"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-500">

                {customer.name.charAt(0)}

              </div>

              <p>{customer.name}</p>

            </div>

            <span className={customer.status === "Active" ? "text-green-500" : "text-gray-400"}>
              {customer.status}
            </span>

          </div>

        ))
      )}

    </div>
  );
}

export default LatestCustomers;
