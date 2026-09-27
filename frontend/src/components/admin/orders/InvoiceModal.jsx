import { FaTimes, FaPrint } from "react-icons/fa";
import { useOrders } from "../../../context/OrderContext";

function InvoiceModal({ open, order, onClose }) {
  const { orderTotal } = useOrders();
  if (!open || !order) return null;
  const total = orderTotal(order);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-6 print:hidden">
          <h2 className="text-2xl font-bold">Invoice {order.orderNumber}</h2>
          <div className="flex gap-3">
            <button onClick={() => window.print()} className="w-11 h-11 rounded-full hover:bg-pink-100 flex items-center justify-center transition"><FaPrint /></button>
            <button onClick={onClose} className="w-11 h-11 rounded-full hover:bg-pink-100 flex items-center justify-center transition"><FaTimes /></button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-black text-pink-600">Happy Hooks by Esha</h3>
              <p className="text-gray-500 text-sm mt-1">Handmade crochet, made with love.</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{order.orderNumber}</p>
              <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-b py-5">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wide">Billed To</p>
              <p className="font-semibold mt-1">{order.customerName}</p>
              <p className="text-gray-500 text-sm">{order.customerEmail}</p>
              <p className="text-gray-500 text-sm">{order.customerPhone}</p>
              <p className="text-gray-500 text-sm mt-1">
                {order.shippingAddress?.address}, {order.shippingAddress?.city}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm uppercase tracking-wide">Payment</p>
              <p className="font-semibold mt-1">{order.paymentMethod}</p>
              <p className="text-gray-500 text-sm mt-1">Status: {order.orderStatus}</p>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm uppercase">
                <th className="pb-3">Item</th>
                <th className="pb-3 text-center">Qty</th>
                <th className="pb-3 text-right">Price</th>
                <th className="pb-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="py-3">{item.name}</td>
                  <td className="py-3 text-center">{item.quantity}</td>
                  <td className="py-3 text-right">Rs. {item.price}</td>
                  <td className="py-3 text-right">Rs. {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-56 space-y-2">
              <div className="flex justify-between text-gray-500"><span>Shipping</span><span>Rs. {order.shippingFee ?? 0}</span></div>
              {order.discount > 0 && (
                <div className="flex justify-between text-gray-500"><span>Discount</span><span>- Rs. {order.discount}</span></div>
              )}
              <div className="flex justify-between text-xl font-bold border-t pt-3"><span>Total</span><span>Rs. {total}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
