function OrderStatus({ status }) {

  const colors = {
    Pending: "bg-yellow-100 text-yellow-600",
    Processing: "bg-blue-100 text-blue-600",
    Shipped: "bg-purple-100 text-purple-600",
    Delivered: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default OrderStatus;