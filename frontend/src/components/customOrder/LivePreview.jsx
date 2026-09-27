import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaGift,
  FaPalette,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaImage,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaHome,
  FaStickyNote,
} from "react-icons/fa";

function LivePreview({
  formData = {
    name: "",
    phone: "",
    email: "",
    productType: "",
    color: "",
    budget: "",
    city: "",
    address: "",
    deliveryDate: "",
    notes: "",
    image: null,
  },
}) {
  const InfoCard = ({ icon, title, value }) => (
    <div className="flex items-center gap-4">

      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h3 className="font-semibold break-words">
          {value}
        </h3>
      </div>

    </div>
  );

  return (
    <div className="sticky top-28">

      <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-8 text-white">

          <p className="uppercase tracking-[4px] text-sm opacity-90">
            Live Preview
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Your Custom Order
          </h2>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          <InfoCard
            icon={<FaUser className="text-pink-500" />}
            title="Customer"
            value={formData.name || "Not Entered"}
          />

          <InfoCard
            icon={<FaPhone className="text-pink-500" />}
            title="Phone"
            value={formData.phone || "Not Entered"}
          />

          <InfoCard
            icon={<FaEnvelope className="text-pink-500" />}
            title="Email"
            value={formData.email || "Not Entered"}
          />

          <InfoCard
            icon={<FaGift className="text-pink-500" />}
            title="Product"
            value={formData.productType || "Not Selected"}
          />

          <InfoCard
            icon={<FaPalette className="text-pink-500" />}
            title="Color"
            value={formData.color || "Not Selected"}
          />

          <InfoCard
            icon={<FaMoneyBillWave className="text-pink-500" />}
            title="Budget"
            value={formData.budget || "Not Selected"}
          />

          <InfoCard
            icon={<FaMapMarkerAlt className="text-pink-500" />}
            title="City"
            value={formData.city || "Not Selected"}
          />

          <InfoCard
            icon={<FaHome className="text-pink-500" />}
            title="Delivery Address"
            value={formData.address || "Not Entered"}
          />

          <InfoCard
            icon={<FaCalendarAlt className="text-pink-500" />}
            title="Delivery Date"
            value={formData.deliveryDate || "Not Selected"}
          />

          <InfoCard
            icon={<FaStickyNote className="text-pink-500" />}
            title="Additional Notes"
            value={formData.notes || "No Notes"}
          />

          {/* Image */}

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">

              <FaImage className="text-pink-500" />

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Inspiration Image
              </p>

              <h3 className="font-semibold">

                {formData.image ? (
                  <span className="text-green-600 flex items-center gap-2">

                    <FaCheckCircle />

                    Uploaded Successfully

                  </span>
                ) : (
                  "No Image Uploaded"
                )}

              </h3>

            </div>

          </div>

          {formData.image && (

            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="rounded-2xl w-full h-60 object-cover shadow-lg"
            />

          )}

          <div className="border-t pt-6">

            <div className="bg-pink-50 rounded-2xl p-5">

              <p className="text-gray-600 leading-7">

                💖 Your custom crochet product will be handmade with love and premium yarn.
                Once submitted, our team will contact you to confirm the design,
                final price and delivery schedule.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LivePreview;