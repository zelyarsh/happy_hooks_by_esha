import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


const FAQ = () => {

  const [open, setOpen] = useState(null);


  const questions = [

    {
      question:"How can I place an order?",
      answer:
      "You can easily place your order through our website by adding your favorite crochet items to the cart and completing checkout."
    },

    {
      question:"Do you make custom crochet products?",
      answer:
      "Yes, we create customized crochet pieces according to your requirements. Contact us with your idea and we will help you."
    },

    {
      question:"How long does delivery take?",
      answer:
      "Delivery time depends on the product and customization requirements. Ready products are delivered faster than custom orders."
    },

    {
      question:"Can I request a different color or design?",
      answer:
      "Yes, you can request your preferred colors and design changes for customized products."
    },

    {
      question:"How can I contact Happy Hooks by Esha?",
      answer:
      "You can contact us through our contact form, WhatsApp, or social media pages."
    }

  ];



  return (

    <section className="contact-faq-section">

      <div 
        className="contact-faq-container"
        data-aos="fade-up"
      >


        <div className="contact-faq-title">

          <h2>
            Frequently Asked Questions
          </h2>

          <p>
            Everything you need to know about our handmade crochet products.
          </p>

        </div>



        {
          questions.map((item,index)=>(

            <div 
              className="faq-card"
              key={index}
            >

              <button
                className="faq-question"
                onClick={()=> 
                  setOpen(open === index ? null : index)
                }
              >

                {item.question}


                <FaChevronDown
                  className={
                    open === index 
                    ? "faq-arrow active"
                    : "faq-arrow"
                  }
                />

              </button>



              {
                open === index && (

                  <div className="faq-answer">

                    {item.answer}

                  </div>

                )
              }


            </div>

          ))
        }


      </div>

    </section>

  );

};


export default FAQ;
