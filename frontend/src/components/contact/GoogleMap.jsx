import { FaMapMarkerAlt } from "react-icons/fa";

const GoogleMap = () => {
  return (
    <section className="contact-map-section" data-aos="fade-up">

      <div className="contact-map-heading">

        <FaMapMarkerAlt className="contact-map-icon" />

        <h2>Find Us Here</h2>

        <p>
          Have questions or want to discuss a custom crochet order?
          Visit us or connect with us online.
        </p>

      </div>


      <div className="contact-map-box">

        <iframe
          title="Happy Hooks Location"
          src="https://maps.google.com/maps?q=Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        ></iframe>

      </div>

    </section>
  );
};

export default GoogleMap;
