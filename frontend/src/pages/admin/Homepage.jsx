import HeroManager from "../../components/admin/homepage/HeroManager";
import BannerManager from "../../components/admin/homepage/BannerManager";
import FAQManager from "../../components/admin/homepage/FAQManager";
import TestimonialManager from "../../components/admin/homepage/TestimonialManager";
import InstagramManager from "../../components/admin/homepage/InstagramManager";

function Homepage() {
  return (
    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
          Website Content
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Homepage Manager
        </h1>

        <p className="text-gray-500 mt-2">
          Manage every section displayed on your homepage.
        </p>

      </div>

      <HeroManager />

      <BannerManager />

      <FAQManager />

      <TestimonialManager />

      <InstagramManager />

    </div>
  );
}

export default Homepage;