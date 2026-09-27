const colors = [
  {
    name: "Pink",
    color: "#ec4899",
  },
  {
    name: "White",
    color: "#ffffff",
    border: true,
  },
  {
    name: "Red",
    color: "#ef4444",
  },
  {
    name: "Purple",
    color: "#9333ea",
  },
  {
    name: "Blue",
    color: "#3b82f6",
  },
  {
    name: "Yellow",
    color: "#facc15",
  },
  {
    name: "Orange",
    color: "#f97316",
  },
  {
    name: "Green",
    color: "#22c55e",
  },
  {
    name: "Brown",
    color: "#8b5a2b",
  },
  {
    name: "Multi Color",
    color:
      "linear-gradient(45deg,#ec4899,#facc15,#22c55e,#3b82f6)",
  },
];

function ColorSelector({
  selectedColor,
  setSelectedColor,
}) {
  return (
    <div>

      <label className="block font-semibold text-lg mb-5">
        Choose Color
      </label>

      <div className="grid grid-cols-5 gap-5">

        {colors.map((item) => (

          <button
            key={item.name}
            type="button"
            onClick={() => setSelectedColor(item.name)}
            className={`flex flex-col items-center transition duration-300

            ${
              selectedColor === item.name
                ? "scale-110"
                : "hover:scale-105"
            }`}
          >

            <div
              style={{
                background: item.color,
              }}
              className={`w-16 h-16 rounded-full shadow-lg

              ${
                item.border
                  ? "border"
                  : ""
              }

              ${
                selectedColor === item.name
                  ? "ring-4 ring-pink-400"
                  : ""
              }`}
            />

            <span className="text-sm mt-3">

              {item.name}

            </span>

          </button>

        ))}

      </div>

    </div>
  );
}

export default ColorSelector;