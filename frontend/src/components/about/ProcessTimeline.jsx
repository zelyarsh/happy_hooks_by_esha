import {
  FaLightbulb,
  FaPencilAlt,
  FaHandsHelping,
  FaGift,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaLightbulb />,
    title: "Idea",
    description:
      "Every product begins with inspiration and creativity.",
  },
  {
    icon: <FaPencilAlt />,
    title: "Design",
    description:
      "Patterns and colors are carefully selected.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Handmade",
    description:
      "Each stitch is crocheted with patience and love.",
  },
  {
    icon: <FaGift />,
    title: "Delivered",
    description:
      "Beautifully packed and delivered to your doorstep.",
  },
];

function ProcessTimeline() {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
            Our Process
          </p>

          <h2 className="text-5xl font-bold mt-4">
            From Yarn To Your Hands
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {steps.map((step, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-3 transition"
            >

              <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl mx-auto">

                {step.icon}

              </div>

              <h3 className="text-2xl font-bold mt-6">
                {step.title}
              </h3>

              <p className="text-gray-500 leading-7 mt-4">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ProcessTimeline;