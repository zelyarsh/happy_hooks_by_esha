import cityData from "../../data/cityData";

function CitySelector({
  selectedCity,
  setSelectedCity,
}) {
  return (
    <div>

      <label className="block text-lg font-semibold mb-3">
        Delivery City
      </label>

      <select
        value={selectedCity}
        onChange={(e) =>
          setSelectedCity(e.target.value)
        }
        className="w-full rounded-2xl border border-gray-300 p-4 focus:border-pink-500 outline-none"
      >

        <option value="">
          Select your city
        </option>

        {cityData.map((item) => (

          <option
            key={item.city}
            value={item.city}
          >
            {item.city}
          </option>

        ))}

      </select>

    </div>
  );
}

export default CitySelector;