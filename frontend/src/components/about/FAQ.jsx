import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How long does a custom order take?",
    answer:
      "Usually between 5–10 working days depending on the design.",
  },
  {
    question: "Do you deliver all over Pakistan?",
    answer:
      "Yes! We provide nationwide delivery through trusted courier services.",
  },
  {
    question: "Can I request my own design?",
    answer:
      "Absolutely! You can upload inspiration images on the Custom Order page.",
  },
  {
    question: "What material do you use?",
    answer:
      "We use premium quality cotton and acrylic yarn for durability and softness.",
  },
];

function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-24">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
            FAQ
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-16 space-y-6">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >

                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                <FaChevronDown
                  className={`transition ${
                    active === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              {active === index && (

                <div className="px-6 pb-6 text-gray-600 leading-7">

                  {faq.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;