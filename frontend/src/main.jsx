import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Animation & UI libraries
import AOS from "aos";
import "aos/dist/aos.css";

// Context Providers
import { CategoryProvider } from "./context/CategoryContext";
import { SubCategoryProvider } from "./context/SubCategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { ToastProvider } from "./context/ToastContext";
import { OrderProvider } from "./context/OrderContext";
import { CustomerProvider } from "./context/CustomerContext";
import { ReviewProvider } from "./context/ReviewContext";
import { HomepageProvider } from "./context/HomepageContext";
import { SettingsProvider } from "./context/SettingsContext";
import { MediaProvider } from "./context/MediaContext";

// Initialize Animations
AOS.init({
  duration: 1000,
  once: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CategoryProvider>
      <SubCategoryProvider>
      <ProductProvider>
        <WishlistProvider>
          <CartProvider>
            <SearchProvider>
              <ToastProvider>
                <OrderProvider>
                  <CustomerProvider>
                    <ReviewProvider>
                      <HomepageProvider>
                        <SettingsProvider>
                          <MediaProvider>
                            <App />
                          </MediaProvider>
                        </SettingsProvider>
                      </HomepageProvider>
                    </ReviewProvider>
                  </CustomerProvider>
                </OrderProvider>
              </ToastProvider>
            </SearchProvider>
          </CartProvider>
        </WishlistProvider>
      </ProductProvider>
      </SubCategoryProvider>
    </CategoryProvider>
  </StrictMode>
);
