import {
FaEye,
FaEdit,
FaTrash,
FaCopy,
} from "react-icons/fa";

function SubCategoryActions({

onView,
onEdit,
onDelete,
onDuplicate,

}){

return(

<div className="flex justify-center gap-2">

<button

onClick={onView}

className="w-10 h-10 rounded-xl bg-blue-500 text-white hover:bg-blue-600"

>

<FaEye className="mx-auto"/>

</button>

<button

onClick={onEdit}

className="w-10 h-10 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600"

>

<FaEdit className="mx-auto"/>

</button>

<button

onClick={onDuplicate}

className="w-10 h-10 rounded-xl bg-purple-500 text-white hover:bg-purple-600"

>

<FaCopy className="mx-auto"/>

</button>

<button

onClick={onDelete}

className="w-10 h-10 rounded-xl bg-red-500 text-white hover:bg-red-600"

>

<FaTrash className="mx-auto"/>

</button>

</div>

);

}

export default SubCategoryActions;