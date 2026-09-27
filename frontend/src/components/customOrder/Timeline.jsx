import {
  FaClipboardList,
  FaComments,
  FaPaintBrush,
  FaGift,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaClipboardList />,
    title: "Submit Request",
    desc: "Fill the custom order form.",
  },
  {
    icon: <FaComments />,
    title: "Confirmation",
    desc: "We'll contact you within 24 hours.",
  },
  {
    icon: <FaPaintBrush />,
    title: "Handmade Creation",
    desc: "We start crocheting your order.",
  },
  {
    icon: <FaGift />,
    title: "Delivery",
    desc: "Safely delivered to your doorstep.",
  },
];

function Timeline() {
  return (
    <section className="py-24">

      <div className="text-center mb-20">

        <p className="uppercase tracking-[5px] text-pink-500 font-semibold">

          Simple Process

        </p>

        <h2 className="text-5xl font-bold mt-4">

          How It Works

        </h2>

      </div>

      <div className="grid md:grid-cols-4 gap-10">

        {steps.map((step, index) => (

          <div
            key={index}
            className="relative bg-white rounded-[30px] shadow-lg p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition duration-300"
          >

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white flex items-center justify-center text-3xl mx-auto">

              {step.icon}

            </div>

            <h3 className="text-2xl font-bold mt-8">

              {step.title}

            </h3>

            <p className="text-gray-500 mt-4 leading-8">

              {step.desc}

            </p>

            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute top-10 -right-8 w-16 border-t-4 border-dashed border-pink-300"></div>
            )}

          </div>

        ))}

      </div>

    </section>
  );
}

export default Timeline;