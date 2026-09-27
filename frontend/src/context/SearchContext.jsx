import { createContext, useContext, useMemo, useState } from "react";
import { useProducts } from "./ProductContext";
import { mapStorefrontProducts } from "../utils/mapStorefrontProduct";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();

    return mapStorefrontProducts(products).filter((product) => {
      return (
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    });
  }, [products, searchQuery]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
