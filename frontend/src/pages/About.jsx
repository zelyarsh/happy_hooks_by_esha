import HeroSection from "../components/about/HeroSection";
import OurStory from "../components/about/OurStory";
import WhyChooseUs from "../components/about/WhyChooseUs";
import MeetMaker from "../components/about/MeetMaker";
import ProcessTimeline from "../components/about/ProcessTimeline";
import StatsSection from "../components/about/StatsSection";
import Testimonials from "../components/about/Testimonials";
import FAQ from "../components/about/FAQ";
import CTASection from "../components/about/CTASection";

function About() {
  return (
    <main className="bg-gradient-to-b from-pink-50 via-white to-white">

      <HeroSection />

      <OurStory />

      <WhyChooseUs />

      <MeetMaker />

      <ProcessTimeline />

      <StatsSection />

      <Testimonials />

      <FAQ />

      <CTASection />

    </main>
  );
}

export default About;