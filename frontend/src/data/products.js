import product1 from "../assets/images/products/product1.png";
import product2 from "../assets/images/products/product2.png";
import product3 from "../assets/images/products/product3.png";
import product4 from "../assets/images/products/product4.png";
import product5 from "../assets/images/products/product5.png";
import product6 from "../assets/images/products/product6.png";
import product7 from "../assets/images/products/product7.png";
import product8 from "../assets/images/products/product8.png";

const products = [
  { id: 1, name: "Crochet Bouquet", image: product1, images: [product1, product2, product3, product4], price: 2500, rating: 5, reviews: 12, stock: 15, categoryId: 2, category: "Bouquets", subCategoryId: null, subCategory: "", badge: "Best Seller", isNew: true, featured: true, showOnHomepage: true, status: "Active", description: "Beautiful handmade crochet bouquet made with premium cotton yarn. A perfect everlasting gift for birthdays, anniversaries, weddings and special occasions." },
  { id: 2, name: "Crochet Tulips", image: product2, images: [product2, product3, product4, product5], price: 2200, rating: 5, reviews: 19, stock: 150, categoryId: 1, category: "Flowers", subCategoryId: 2, subCategory: "Tulips", badge: "Best Seller", isNew: true, featured: false, showOnHomepage: true, status: "Active", description: "Handmade crochet bouquet made with premium cotton yarn. Perfect for birthdays, anniversaries, and gifts." },
  { id: 3, name: "Sunflower Bouquet", image: product3, images: [product3, product4, product5, product6], price: 2800, rating: 4, reviews: 19, stock: 190, categoryId: 1, category: "Flowers", subCategoryId: 3, subCategory: "Sunflowers", badge: "Best Seller", isNew: true, featured: false, showOnHomepage: true, status: "Active", description: "Handmade crochet bouquet made with premium cotton yarn. Perfect for birthdays, anniversaries, and gifts." },
  { id: 4, name: "Crochet Bunny", image: product4, images: [product4, product5, product6, product7], price: 1800, rating: 5, reviews: 2, stock: 75, categoryId: 3, category: "Plushies", subCategoryId: 4, subCategory: "Bunnies", badge: "Best Seller", isNew: true, featured: false, showOnHomepage: true, status: "Active", description: "Handmade crochet bouquet made with premium cotton yarn. Perfect for birthdays, anniversaries, and gifts." },
  { id: 5, name: "Heart Keychain", image: product5, images: [product5, product6, product7, product8], price: 650, rating: 5, reviews: 5, stock: 16, categoryId: 4, category: "Keychain", subCategoryId: 6, subCategory: "Heart Keychains", badge: "Best Seller", isNew: true, featured: false, showOnHomepage: true, status: "Active", description: "Handmade crochet bouquet made with premium cotton yarn. Perfect for birthdays, anniversaries, and gifts." },
  { id: 6, name: "Rose Bouquet", image: product6, images: [product6, product7, product8, product1], price: 3200, rating: 5, reviews: 18, stock: 25, categoryId: 2, category: "Bouquets", subCategoryId: null, subCategory: "", badge: "Sale", isNew: true, featured: true, showOnHomepage: true, status: "Active", description: "Handmade crochet bouquet made with premium cotton yarn. Perfect for birthdays, anniversaries, and gifts." },
  { id: 7, name: "Mini Flower Pot", image: product7, images: [product7, product8, product1, product2], price: 1400, rating: 4, reviews: 120, stock: 0, categoryId: 5, category: "Home Decor", subCategoryId: null, subCategory: "", badge: "Custom", isNew: true, featured: false, showOnHomepage: false, status: "Active", description: "Handmade crochet bouquet made with premium cotton yarn. Perfect for birthdays, anniversaries, and gifts." },
  { id: 8, name: "Custom Gift Box", image: product8, images: [product8, product1, product2, product3], price: 4500, rating: 5, reviews: 100, stock: 90, categoryId: 6, category: "Gift Boxes", subCategoryId: null, subCategory: "", badge: "New Arrival", isNew: true, featured: true, showOnHomepage: true, status: "Active", description: "Handmade crochet bouquet made with premium cotton yarn. Perfect for birthdays, anniversaries, and gifts." },
];

export default products;
