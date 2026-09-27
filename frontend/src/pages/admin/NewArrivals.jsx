import { useMemo, useState } from "react";
import ArrivalForm from "../../components/admin/arrivals/ArrivalForm";
import ArrivalFilter from "../../components/admin/arrivals/ArrivalFilter";
import NewArrivalTable from "../../components/admin/arrivals/NewArrivalTable";
import ArrivalModal from "../../components/admin/arrivals/ArrivalModal";
import { useProducts } from "../../context/ProductContext";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/300x300/fce7f3/ec4899?text=No+Image";

const mapProduct = (product) => ({
  ...product,
  id: product._id,
  image: product.images?.[0] || PLACEHOLDER_IMAGE,
  category: product.categoryId?.name || "",
  subCategory: product.subCategoryId?.name || "",
  isNew: !!product.newArrival,
});

function NewArrivals() {
  const { products } = useProducts();
  const mappedProducts = useMemo(() => products.map(mapProduct), [products]);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const arrivals = useMemo(() => {
    return mappedProducts.filter((p) => {
      if (!p.isNew) return false;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || p.category === category;
      const matchStatus = !status || p.status === status;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [mappedProducts, search, category, status]);

  const openAdd = () => {
    setEditingProduct(null);
    setShowForm((prev) => !prev);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="space-y-8">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
        <div>
          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">Homepage Collection</p>
          <h1 className="text-4xl font-bold mt-2">New Arrivals</h1>
          <p className="text-gray-500 mt-2">Manage products displayed in the New Arrival section.</p>
        </div>

        <button
          onClick={openAdd}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          {showForm ? "Close Form" : "+ Add New Arrival"}
        </button>
      </div>

      {showForm && (
        <ArrivalForm
          product={editingProduct}
          onDone={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <ArrivalFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
      />

      <NewArrivalTable
        arrivals={arrivals}
        onView={setViewProduct}
        onEdit={openEdit}
      />

      <ArrivalModal
        open={!!viewProduct}
        product={viewProduct || {}}
        onClose={() => setViewProduct(null)}
      />

    </div>
  );
}

export default NewArrivals;
