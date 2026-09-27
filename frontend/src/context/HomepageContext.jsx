import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  getHomepageAdmin,
  updateHomepage as updateHomepageAPI,
  addFeaturedCategory as addFeaturedCategoryAPI,
  removeFeaturedCategory as removeFeaturedCategoryAPI,
  addFeaturedProduct as addFeaturedProductAPI,
  removeFeaturedProduct as removeFeaturedProductAPI,
  addBanner as addBannerAPI,
  updateBanner as updateBannerAPI,
  deleteBanner as deleteBannerAPI,
  addFaq as addFaqAPI,
  updateFaq as updateFaqAPI,
  deleteFaq as deleteFaqAPI,
  addTestimonial as addTestimonialAPI,
  deleteTestimonial as deleteTestimonialAPI,
  addInstagramMedia as addInstagramMediaAPI,
  deleteInstagramMedia as deleteInstagramMediaAPI,
} from "../services/homepageService";

const HomepageContext = createContext();

const DEFAULT_HOMEPAGE = {
  hero: {
    title: "Handmade With Love",
    subtitle: "Beautiful crochet creations made especially for you.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: "",
    active: true,
  },
  announcement: { text: "", active: true },
  banners: [],
  faqs: [],
  testimonials: [],
  instagramMedia: [],
  featuredCategories: [],
  featuredProducts: [],
  sections: {},
  aboutSection: {},
};

export function HomepageProvider({ children }) {
  const [homepage, setHomepage] = useState(DEFAULT_HOMEPAGE);
  const [loading, setLoading] = useState(true);

  const fetchHomepage = async () => {
    try {
      setLoading(true);
      const data = await getHomepageAdmin();
      setHomepage({ ...DEFAULT_HOMEPAGE, ...data.homepage });
    } catch (error) {
      console.error("Failed to fetch homepage:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepage();
  }, []);

  const patch = (fields) => setHomepage((prev) => ({ ...prev, ...fields }));

  // -----------------------------
  // Hero / announcement
  // -----------------------------
  const updateHero = async (hero) => {
    try {
      const data = await updateHomepageAPI({ hero });
      patch({ hero: data.homepage.hero });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateAnnouncement = async (announcement) => {
    try {
      const data = await updateHomepageAPI({ announcement });
      patch({ announcement: data.homepage.announcement });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // -----------------------------
  // Featured categories / products
  // -----------------------------
  const addFeaturedCategory = async (categoryId) => {
    const data = await addFeaturedCategoryAPI(categoryId);
    patch({ featuredCategories: data.featuredCategories });
  };
  const removeFeaturedCategory = async (categoryId) => {
    const data = await removeFeaturedCategoryAPI(categoryId);
    patch({ featuredCategories: data.featuredCategories });
  };
  const addFeaturedProduct = async (productId) => {
    const data = await addFeaturedProductAPI(productId);
    patch({ featuredProducts: data.featuredProducts });
  };
  const removeFeaturedProduct = async (productId) => {
    const data = await removeFeaturedProductAPI(productId);
    patch({ featuredProducts: data.featuredProducts });
  };

  // -----------------------------
  // Banners
  // -----------------------------
  const addBanner = async (banner) => {
    const data = await addBannerAPI(banner);
    patch({ banners: data.banners });
  };
  const toggleBannerStatus = async (id) => {
    const banner = homepage.banners.find((b) => b._id === id);
    if (!banner) return;
    const data = await updateBannerAPI(id, {
      status: banner.status === "Active" ? "Inactive" : "Active",
    });
    patch({ banners: data.banners });
  };
  const deleteBanner = async (id) => {
    const data = await deleteBannerAPI(id);
    patch({ banners: data.banners });
  };

  // -----------------------------
  // FAQs
  // -----------------------------
  const addFaq = async (faq) => {
    const data = await addFaqAPI(faq);
    patch({ faqs: data.faqs });
  };
  const updateFaq = async (faq) => {
    const data = await updateFaqAPI(faq._id, faq);
    patch({ faqs: data.faqs });
  };
  const deleteFaq = async (id) => {
    const data = await deleteFaqAPI(id);
    patch({ faqs: data.faqs });
  };

  // -----------------------------
  // Testimonials
  // -----------------------------
  const addTestimonial = async (t) => {
    const data = await addTestimonialAPI(t);
    patch({ testimonials: data.testimonials });
  };
  const deleteTestimonial = async (id) => {
    const data = await deleteTestimonialAPI(id);
    patch({ testimonials: data.testimonials });
  };

  // -----------------------------
  // Instagram media
  // -----------------------------
  const addInstagramMedia = async (m) => {
    const data = await addInstagramMediaAPI(m);
    patch({ instagramMedia: data.instagramMedia });
  };
  const deleteInstagramMedia = async (id) => {
    const data = await deleteInstagramMediaAPI(id);
    patch({ instagramMedia: data.instagramMedia });
  };

  const value = useMemo(
    () => ({
      ...homepage,
      loading,
      fetchHomepage,
      updateHero,
      updateAnnouncement,
      addFeaturedCategory,
      removeFeaturedCategory,
      addFeaturedProduct,
      removeFeaturedProduct,
      addBanner,
      toggleBannerStatus,
      deleteBanner,
      addFaq,
      updateFaq,
      deleteFaq,
      addTestimonial,
      deleteTestimonial,
      addInstagramMedia,
      deleteInstagramMedia,
    }),
    [homepage, loading]
  );

  return <HomepageContext.Provider value={value}>{children}</HomepageContext.Provider>;
}

export const useHomepage = () => useContext(HomepageContext);
