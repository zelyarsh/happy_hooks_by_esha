import { useState } from "react";

import CategoryHeader from "../../components/admin/category/CategoryHeader";
import CategoryStats from "../../components/admin/category/CategoryStats";
import CategoryToolbar from "../../components/admin/category/CategoryToolbar";
import CategoryTable from "../../components/admin/category/CategoryTable";
import CategoryModal from "../../components/admin/category/CategoryModal";

import { useCategories } from "../../context/CategoryContext";

function Categories() {

  const { addCategory } = useCategories();

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="space-y-8">

      <CategoryHeader />

      <CategoryStats />

      <CategoryToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setOpenModal(true)}
      />

      <CategoryTable
        search={search}
      />

      <CategoryModal
        open={openModal}
        category={null}
        onClose={() => setOpenModal(false)}
        onSave={async (data) => {
  const result = await addCategory(data);

  if (result.success) {
    setOpenModal(false);
  } else {
    alert(result.message);
  }
}}
      />

    </div>
  );
}

export default Categories;