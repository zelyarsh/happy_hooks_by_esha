import { FaTrash } from "react-icons/fa";


function DeleteSubCategoryModal({
  open,
  subCategory,
  onClose,
  onDelete,
}) {


if(!open || !subCategory) return null;


return (

<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">


<div className="bg-white rounded-3xl p-8 w-full max-w-md">


<div className="text-center">


<div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto">

<FaTrash className="text-red-500 text-3xl"/>

</div>


<h2 className="text-2xl font-black mt-5">

Delete Sub Category?

</h2>


<p className="text-gray-500 mt-3">

Are you sure you want to delete

<br/>

<b>{subCategory.name}</b> ?

</p>



<div className="flex gap-4 mt-8">


<button

onClick={onClose}

className="flex-1 border py-3 rounded-xl"

>

Cancel

</button>



<button

onClick={()=>{

onDelete(subCategory.id);

onClose();

}}

className="flex-1 bg-red-500 text-white py-3 rounded-xl"

>

Delete

</button>


</div>


</div>


</div>


</div>

);


}

export default DeleteSubCategoryModal;