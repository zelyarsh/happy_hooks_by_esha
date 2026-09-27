import { useState } from "react";

import SubCategoryHeader from "../../components/admin/subCategory/SubCategoryHeader";
import SubCategoryStats from "../../components/admin/subCategory/SubCategoryStats";
import SubCategoryToolbar from "../../components/admin/subCategory/SubCategoryToolbar";
import SubCategoryTable from "../../components/admin/subCategory/SubCategoryTable";
import SubCategoryModal from "../../components/admin/subCategory/SubCategoryModal";

import { useSubCategories } from "../../context/SubCategoryContext";

function SubCategories() {
  const { addSubCategory } = useSubCategories();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">
      <SubCategoryHeader />

      <SubCategoryStats />

      <SubCategoryToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setOpen(true)}
      />

      <SubCategoryTable search={search} />

      <SubCategoryModal
        open={open}
        subCategory={null}
        onClose={() => setOpen(false)}
        onSave={async (data) => {
          const result = await addSubCategory(data);

          if (result.success) {
            setOpen(false);
          } else {
            alert(result.message);
          }
        }}
      />
    </div>
  );
}

export default SubCategories;