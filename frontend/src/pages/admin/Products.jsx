import { useEffect, useState } from "react";

import ProductHeader from "../../components/admin/product/ProductHeader";
import ProductStats from "../../components/admin/product/ProductStats";
import ProductToolbar from "../../components/admin/product/ProductToolbar";
import ProductTable from "../../components/admin/product/ProductTable";
import ProductGrid from "../../components/admin/product/ProductGrid";
import ProductModal from "../../components/admin/product/ProductModal";
import ProductLoading from "../../components/admin/product/ProductLoading";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [view, setView] = useState("table");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="space-y-8">

      <ProductHeader onAdd={handleAdd} />

      {loading ? (
        <ProductLoading />
      ) : (
        <div className="animate-fadeIn">
          <ProductStats />
        </div>
      )}

      <ProductToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
      />

      {loading ? (
        <ProductLoading />
      ) : view === "grid" ? (
        <ProductGrid
          search={search}
          category={category}
          sort={sort}
          onEdit={handleEdit}
        />
      ) : (
        <ProductTable
          search={search}
          category={category}
          sort={sort}
          onEdit={handleEdit}
        />
      )}

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editingProduct}
      />

    </div>
  );
}

export default Products;
