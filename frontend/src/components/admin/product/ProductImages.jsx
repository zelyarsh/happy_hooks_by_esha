import { useState } from "react";

function ProductImages({ images = [] }) {
  const [selected, setSelected] = useState(0);

  if (!images.length) {
    return (
      <div className="w-full h-96 rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400">
        No Images
      </div>
    );
  }

  return (
    <div>

      <img
        src={images[selected]}
        alt=""
        className="w-full h-96 rounded-3xl object-cover transition-opacity duration-200"
      />

      <div className="grid grid-cols-4 gap-4 mt-5">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            onClick={() => setSelected(index)}
            className={`rounded-xl h-24 w-full object-cover cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
              selected === index ? "border-pink-500" : "border-transparent"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default ProductImages;
