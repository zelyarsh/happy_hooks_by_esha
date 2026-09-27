function getPageWindow(page, totalPages) {
  const window = 1;
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - window && i <= page + window)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
}

function ProductPagination({
  page = 1,
  setPage,
  totalPages = 1,
  totalItems = 0,
  pageSize = 6,
}) {
  if (totalPages <= 1) {
    return (
      <div className="flex justify-between items-center mt-8">
        <p className="text-gray-500 text-sm">
          Showing {totalItems} product{totalItems !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const pages = getPageWindow(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">

      <p className="text-gray-500 text-sm">
        Showing <span className="font-semibold text-gray-700">{start}-{end}</span> of{" "}
        <span className="font-semibold text-gray-700">{totalItems}</span> products
      </p>

      <div className="flex gap-2">

        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="w-10 h-10 rounded-xl border transition-all duration-200 hover:bg-pink-50 hover:border-pink-300 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed"
        >
          ‹
        </button>

        {pages.map((p, index) =>
          p === "..." ? (
            <span
              key={`dots-${index}`}
              className="w-10 h-10 flex items-center justify-center text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              type="button"
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-xl border transition-all duration-200 ${
                p === page
                  ? "bg-pink-500 border-pink-500 text-white shadow-md scale-105"
                  : "hover:bg-pink-50 hover:border-pink-300"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="w-10 h-10 rounded-xl border transition-all duration-200 hover:bg-pink-50 hover:border-pink-300 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed"
        >
          ›
        </button>

      </div>

    </div>
  );
}

export default ProductPagination;
