import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import SearchItem from "./SearchItem";

function SearchDropdown({ onClose }) {
  const { filteredProducts, searchQuery } = useSearch();

  if (!searchQuery.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50">

      {filteredProducts.length > 0 ? (
        <>
          <div className="max-h-96 overflow-y-auto">

            {filteredProducts.slice(0, 5).map((product) => (

              <SearchItem
                key={product.id}
                product={product}
                onClick={onClose}
              />

            ))}

          </div>

          <div className="border-t p-4">

            <Link
  to={`/shop?search=${encodeURIComponent(searchQuery)}`}
  onClick={onClose}
  className="block text-center bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-full font-semibold"
>
  View All Results →
</Link>

          </div>
        </>
      ) : (
        <div className="p-10 text-center">

          <div className="text-5xl mb-4">
            😔
          </div>

          <h3 className="font-bold text-xl">
            No Products Found
          </h3>

          <p className="text-gray-500 mt-2">
            Try another keyword.
          </p>

        </div>
      )}

    </div>
  );
}

export default SearchDropdown;