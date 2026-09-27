import { useState } from "react";

function ProductImageSlider({ images = [] }) {
  const [selected, setSelected] = useState(0);
  const [fade, setFade] = useState(true);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[420px] rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400">
        No Image
      </div>
    );
  }

  const selectImage = (index) => {
    if (index === selected) return;
    setFade(false);
    setTimeout(() => {
      setSelected(index);
      setFade(true);
    }, 120);
  };

  return (
    <div>

      <div className="w-full h-[420px] rounded-3xl overflow-hidden bg-gray-50">
        <img
          src={images[selected]}
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="flex gap-3 mt-5 overflow-x-auto pb-1">

        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            onClick={() => selectImage(index)}
            className={`w-20 h-20 flex-shrink-0 rounded-xl cursor-pointer object-cover border-2 transition-all duration-200 hover:scale-105 ${
              selected === index
                ? "border-pink-500 shadow-md"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          />
        ))}

      </div>

    </div>
  );
}

export default ProductImageSlider;
