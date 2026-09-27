import cityData from "../../data/cityData";
import { FaTruck } from "react-icons/fa";

function DeliveryInfo({ city }) {

  if (!city) return null;

  const info = cityData.find(
    (item) => item.city === city
  );

  if (!info) return null;

  return (

    <div className="bg-pink-50 rounded-3xl p-6 mt-8">

      <div className="flex items-center gap-3">

        <FaTruck
          className="text-pink-500"
          size={22}
        />

        <h3 className="font-bold text-xl">

          Delivery Details

        </h3>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">

          <span>Shipping</span>

          <span className="font-semibold">

            Rs. {info.shipping}

          </span>

        </div>

        <div className="flex justify-between">

          <span>Estimated Delivery</span>

          <span className="font-semibold">

            {info.days}

          </span>

        </div>

      </div>

    </div>

  );
}

export default DeliveryInfo;