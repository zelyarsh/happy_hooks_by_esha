import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";


function ContactInfo() {


  const contactItems = [

    {
      icon:<FaPhoneAlt />,
      title:"Phone",
      text:"+92 300 1234567"
    },


    {
      icon:<FaEnvelope />,
      title:"Email",
      text:"happyhooksbyesha@gmail.com"
    },


    {
      icon:<FaMapMarkerAlt />,
      title:"Location",
      text:"Pakistan"
    },


  ];



  return (

    <div 
      data-aos="fade-right"
      data-aos-duration="1000"
    >


      <p
        className="
        uppercase 
        tracking-[4px] 
        text-pink-500 
        font-semibold
        text-sm
        "
      >
        Contact Details
      </p>



      <h2
        className="
        text-4xl
        md:text-5xl
        font-bold
        mt-4
        text-gray-900
        "
      >
        Get In Touch
      </h2>



      <p
        className="
        mt-6 
        text-gray-600 
        leading-8 
        text-lg
        max-w-xl
        "
      >
        We'd love to hear from you! Reach out with any questions,
        custom order requests, or collaboration ideas.
      </p>




      <div
        className="
        space-y-5
        mt-10
        "
      >



        {
          contactItems.map((item,index)=>(


            <div

              key={index}

              data-aos="fade-up"

              data-aos-delay={index * 150}

              className="
              group
              flex
              items-center
              gap-5
              bg-white
              px-6
              py-5
              rounded-2xl
              shadow-md
              hover:shadow-xl
              transition-all
              duration-500
              hover:-translate-y-2
              border
              border-transparent
              hover:border-pink-100
              "

            >



              <div

                className="
                w-14
                h-14
                rounded-full
                bg-pink-100
                flex
                items-center
                justify-center
                group-hover:bg-pink-500
                transition-all
                duration-500
                "

              >

                <span
                  className="
                  text-pink-500
                  text-xl
                  group-hover:text-white
                  transition
                  duration-500
                  "
                >

                  {item.icon}

                </span>


              </div>



              <div>

                <h3
                  className="
                  font-bold
                  text-lg
                  text-gray-900
                  "
                >
                  {item.title}
                </h3>


                <p
                  className="
                  text-gray-500
                  mt-1
                  "
                >
                  {item.text}
                </p>


              </div>


            </div>


          ))
        }




        {/* WhatsApp */}


        <a

          href="https://wa.me/923001234567"

          target="_blank"

          rel="noreferrer"

          data-aos="fade-up"

          data-aos-delay="500"

          className="
          group
          flex
          items-center
          gap-5
          bg-green-500
          text-white
          px-6
          py-5
          rounded-2xl
          shadow-md
          hover:shadow-xl
          hover:-translate-y-2
          transition-all
          duration-500
          "

        >



          <div

            className="
            w-14
            h-14
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            "

          >

            <FaWhatsapp
              className="
              text-green-500
              text-3xl
              "
            />

          </div>




          <div>


            <h3
              className="
              font-bold
              text-lg
              "
            >
              WhatsApp
            </h3>


            <p
              className="
              opacity-90
              mt-1
              "
            >
              Chat with us instantly
            </p>


          </div>



        </a>


      </div>


    </div>

  );

}


export default ContactInfo;