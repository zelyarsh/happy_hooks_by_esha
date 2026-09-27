import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import banner from "../../assets/images/contact/contact.avif";

function HeroSection() {
  return (
    <section
      className="
      relative 
      min-h-[85vh]
      overflow-hidden
      flex
      items-center
      "
    >

      {/* Background */}

      <div
        className="
        absolute
        inset-0
        bg-cover
        bg-center
        animate-[zoom_15s_ease-in-out_infinite]
        "
        style={{
          backgroundImage:`url(${banner})`
        }}
      ></div>



      {/* Overlay */}

      <div
        className="
        absolute
        inset-0
        bg-black/60
        "
      ></div>



      {/* Decorative Glow */}

      <div
        className="
        absolute
        top-10
        right-10
        w-72
        h-72
        bg-pink-500/20
        rounded-full
        blur-[120px]
        animate-pulse
        "
      ></div>


      <div
        className="
        absolute
        bottom-0
        left-0
        w-80
        h-80
        bg-pink-300/20
        rounded-full
        blur-[120px]
        animate-pulse
        "
      ></div>




      {/* Content */}

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        py-24
        w-full
        "
      >

        <div className="max-w-3xl">


          <span
            data-aos="fade-down"
            className="
            inline-flex
            bg-pink-500
            text-white
            px-6
            py-3
            rounded-full
            uppercase
            tracking-[3px]
            text-xs
            md:text-sm
            font-semibold
            shadow-lg
            "
          >
            Contact Happy Hooks
          </span>



          <h1
            data-aos="fade-up"
            data-aos-delay="200"
            className="
            mt-8
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-extrabold
            text-white
            leading-tight
            "
          >

            We'd Love
            <br/>

            To Hear
            <br/>

            From You

          </h1>




          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="
            mt-6
            max-w-2xl
            text-base
            md:text-xl
            leading-8
            text-gray-200
            "
          >

            Have a question about a crochet bouquet,
            plushie, custom order or delivery?
            We're always happy to help.

          </p>




          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="
            flex
            flex-wrap
            gap-4
            mt-10
            "
          >


            <Link
              to="/custom-order"
              className="
              bg-pink-500
              hover:bg-pink-600
              text-white
              px-7
              py-3.5
              rounded-full
              font-semibold
              transition-all
              duration-300
              shadow-xl
              hover:-translate-y-1
              "
            >

              Place Custom Order

            </Link>




            <a
              href="tel:+923001234567"
              className="
              border-2
              border-white
              text-white
              px-7
              py-3.5
              rounded-full
              font-semibold
              flex
              items-center
              gap-3
              transition-all
              duration-300
              hover:bg-white
              hover:text-pink-500
              hover:-translate-y-1
              "
            >

              <FaPhoneAlt/>

              Call Now

            </a>


          </div>


        </div>


      </div>


    </section>
  );
}

export default HeroSection;