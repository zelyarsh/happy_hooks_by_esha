import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) return prev;

      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}