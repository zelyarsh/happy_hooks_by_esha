import { FaPlus, FaFileExport } from "react-icons/fa";
import { useProducts } from "../../../context/ProductContext";

function toCSV(products) {
  const headers = [
    "id",
    "name",
    "category",
    "price",
    "stock",
    "sku",
    "featured",
    "isNew",
    "status",
  ];

  const rows = products.map((p) => {
    const row = {
      id: p._id,
      name: p.name,
      category: p.categoryId?.name || "",
      price: p.price,
      stock: p.stock,
      sku: p.sku || "",
      featured: p.featured,
      isNew: p.newArrival,
      status: p.status,
    };

    return headers
      .map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`)
      .join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

function ProductHeader({ onAdd }) {
  const { products } = useProducts();

  const exportCSV = () => {
    const csv = toCSV(products);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "happy-hooks-products.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 animate-fadeIn">

      <div>
        <h1 className="text-4xl font-black text-gray-800">Products</h1>
        <p className="text-gray-500 mt-2">
          Manage all crochet products from one place.
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={exportCSV}
          className="px-5 py-3 rounded-xl border border-pink-200 flex items-center gap-2 transition-all duration-200 hover:bg-pink-50 hover:shadow-sm active:scale-95"
        >
          <FaFileExport />
          Export CSV
        </button>

        <button
          onClick={onAdd}
          className="group px-6 py-3 rounded-xl bg-pink-500 text-white flex items-center gap-2 transition-all duration-200 hover:bg-pink-600 hover:shadow-lg active:scale-95"
        >
          <FaPlus className="transition-transform duration-200 group-hover:rotate-90" />
          Add Product
        </button>

      </div>

    </div>
  );
}

export default ProductHeader;
