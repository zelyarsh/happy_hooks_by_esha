import HeroSection from "../components/contact/HeroSection";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import BusinessHours from "../components/contact/BusinessHours";
import SocialLinks from "../components/contact/SocialLinks";
import GoogleMap from "../components/contact/GoogleMap";
import FAQ from "../components/contact/FAQ";

function Contact() {
  return (
    <main className="bg-gradient-to-b from-pink-50 via-white to-pink-50">

      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16">

          <ContactInfo />

          <ContactForm />

        </div>

      </section>

      <BusinessHours />

      <SocialLinks />

      <GoogleMap />

      <FAQ />

    </main>
  );
}

export default Contact;