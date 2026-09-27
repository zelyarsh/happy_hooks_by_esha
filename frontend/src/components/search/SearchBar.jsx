import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

import { useSearch } from "../../context/SearchContext";
import SearchDropdown from "./SearchDropdown";

function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
  } = useSearch();

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setSearchQuery("");
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative hidden lg:block w-80"
    >

      <input
        type="text"
        placeholder="Search handmade products..."
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
        className="w-full border rounded-full pl-11 pr-5 py-3 focus:outline-none focus:border-pink-500"
      />

      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <SearchDropdown
        onClose={() => setSearchQuery("")}
      />

    </div>
  );
}

export default SearchBar;