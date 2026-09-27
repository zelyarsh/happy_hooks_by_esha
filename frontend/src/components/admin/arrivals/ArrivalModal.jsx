import { FaTimes } from "react-icons/fa";

function ArrivalModal({ open, onClose, product }) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[700px] max-h-[90vh] overflow-y-auto p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">

            Product Details

          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        <img
          src={product.image}
          alt={product.name}
          className="rounded-2xl w-full h-80 object-cover"
        />

        <div className="mt-8 space-y-5">

          <div>

            <label className="font-semibold">

              Product Name

            </label>

            <input
              value={product.name}
              readOnly
              className="border rounded-xl w-full mt-2 px-5 py-3"
            />

          </div>

          <div>

            <label className="font-semibold">

              Category

            </label>

            <input
              value={product.category}
              readOnly
              className="border rounded-xl w-full mt-2 px-5 py-3"
            />

          </div>

          <div>

            <label className="font-semibold">

              Price

            </label>

            <input
              value={product.price ? `Rs. ${product.price}` : ""}
              readOnly
              className="border rounded-xl w-full mt-2 px-5 py-3"
            />

          </div>

          <div>

            <label className="font-semibold">

              Description

            </label>

            <textarea
              rows="5"
              readOnly
              className="border rounded-xl w-full mt-2 px-5 py-3"
              value={product.description || "Beautiful handmade crochet product."}
            />

          </div>

        </div>

      </div>

    </div>

  );
}

export default ArrivalModal;