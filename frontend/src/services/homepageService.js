import { apiRequest } from "./apiClient";

export const getHomepage = () => apiRequest("/homepage");

export const getHomepageAdmin = () => apiRequest("/homepage/admin");

export const updateHomepage = (payload) =>
  apiRequest("/homepage", { method: "PUT", body: payload });

export const addFeaturedCategory = (categoryId) =>
  apiRequest("/homepage/featured-category", { method: "POST", body: { categoryId } });

export const removeFeaturedCategory = (categoryId) =>
  apiRequest(`/homepage/featured-category/${categoryId}`, { method: "DELETE" });

export const addFeaturedProduct = (productId) =>
  apiRequest("/homepage/featured-product", { method: "POST", body: { productId } });

export const removeFeaturedProduct = (productId) =>
  apiRequest(`/homepage/featured-product/${productId}`, { method: "DELETE" });

// Banners
export const addBanner = (banner) =>
  apiRequest("/homepage/banners", { method: "POST", body: banner });

export const updateBanner = (bannerId, banner) =>
  apiRequest(`/homepage/banners/${bannerId}`, { method: "PUT", body: banner });

export const deleteBanner = (bannerId) =>
  apiRequest(`/homepage/banners/${bannerId}`, { method: "DELETE" });

// FAQs
export const addFaq = (faq) =>
  apiRequest("/homepage/faqs", { method: "POST", body: faq });

export const updateFaq = (faqId, faq) =>
  apiRequest(`/homepage/faqs/${faqId}`, { method: "PUT", body: faq });

export const deleteFaq = (faqId) =>
  apiRequest(`/homepage/faqs/${faqId}`, { method: "DELETE" });

// Testimonials
export const addTestimonial = (testimonial) =>
  apiRequest("/homepage/testimonials", { method: "POST", body: testimonial });

export const deleteTestimonial = (testimonialId) =>
  apiRequest(`/homepage/testimonials/${testimonialId}`, { method: "DELETE" });

// Instagram media
export const addInstagramMedia = (media) =>
  apiRequest("/homepage/instagram", { method: "POST", body: media });

export const deleteInstagramMedia = (mediaId) =>
  apiRequest(`/homepage/instagram/${mediaId}`, { method: "DELETE" });
