import { FaMinus, FaPlus } from "react-icons/fa";

function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex items-center gap-4 mt-5">

      <button
        onClick={onDecrease}
        className="bg-gray-100 hover:bg-pink-100 p-3 rounded-full transition"
      >
        <FaMinus />
      </button>

      <span className="font-bold text-xl">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="bg-gray-100 hover:bg-pink-100 p-3 rounded-full transition"
      >
        <FaPlus />
      </button>

    </div>
  );
}

export default QuantitySelector;