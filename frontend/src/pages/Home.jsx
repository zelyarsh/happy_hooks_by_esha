import AnnouncementBar from "../components/layout/AnnouncementBar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import AboutSection from "../components/home/AboutSection";
import NewArrivals from "../components/home/NewArrivals";
import ShopByOccasion from "../components/home/ShopByOccasion";
import InstagramGallery from "../components/home/InstagramGallery";
import Testimonials from "../components/home/Testimonials";

function Home() {
  return (
    <>
      <AnnouncementBar />
  
      <Hero />
      <Categories />
      <NewArrivals />
      <FeaturedProducts />
      <WhyChooseUs />
      <ShopByOccasion />
      <InstagramGallery />
      <Testimonials />
      <AboutSection />

      
    </>
  );
}

export default Home;
