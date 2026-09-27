import { FaTrash } from "react-icons/fa";
import QuantitySelector from "./QuantitySelector";
import { useToast } from "../../context/ToastContext";

function CartItem({
  item,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
   const { showToast } = useToast();
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition">

      <img
        src={item.image}
        alt={item.name}
        className="w-40 h-40 object-cover rounded-2xl"
      />

      <div className="flex-1">

        <h2 className="text-2xl font-bold">
          {item.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {item.category}
        </p>

        <p className="text-pink-500 text-2xl font-bold mt-4">
          Rs. {item.price}
        </p>

        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => increaseQuantity(item.id)}
          onDecrease={() => decreaseQuantity(item.id)}
        />

      </div>

      <div className="flex flex-col justify-between items-end">

        <button
          onClick={() => {
  removeFromCart(item.id);

  showToast({
    type: "warning",
    title: "Item Removed",
    message: item.name,
  });
}}
          className="text-red-500 hover:scale-110 transition"
        >
          <FaTrash size={22} />
        </button>

        <h3 className="text-2xl font-bold">
          Rs. {item.price * item.quantity}
        </h3>

      </div>

    </div>
  );
}

export default CartItem;