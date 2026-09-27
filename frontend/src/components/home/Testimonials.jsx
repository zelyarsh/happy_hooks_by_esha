import { FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

import customer1 from "../../assets/images/testimonials/customer1.jpg";
import customer2 from "../../assets/images/testimonials/customer2.jpg";
import customer3 from "../../assets/images/testimonials/customer3.jpg";

const testimonials = [
  {
    name: "Sarah Ahmed",
    image: customer1,
    review:
      "Absolutely beautiful crochet bouquet! The quality exceeded my expectations. Highly recommended.",
  },
  {
    name: "Ayesha Khan",
    image: customer2,
    review:
      "Packaging was elegant and delivery was fast. Perfect gift for my sister.",
  },
  {
    name: "Uncle Abbas",
    image: customer3,
    review:
      "The plushie was incredibly soft and handmade with great attention to detail. I'll definitely order again.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-pink-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[5px] text-pink-500 font-semibold">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold mt-4">
            What Our Customers Say
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Every order is handmade with love, and our customers' smiles are our greatest reward.
          </p>

        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />

                <h3 className="text-xl font-bold text-center mt-5">
                  {item.name}
                </h3>

                <div className="flex justify-center text-yellow-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="text-gray-600 mt-6 leading-8 text-center">
                  "{item.review}"
                </p>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}

export default Testimonials;