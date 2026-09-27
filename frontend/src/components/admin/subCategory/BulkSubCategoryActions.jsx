import {
FaTrash,
FaCheck,
FaBan,
FaStar,
} from "react-icons/fa";

function BulkSubCategoryActions({

selected,

onDelete,
onActivate,
onDeactivate,
onFeature,

}){

if(selected.length===0) return null;

return(

<div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 flex justify-between items-center flex-wrap gap-4">

<h3 className="font-bold text-pink-600">

{selected.length} Selected

</h3>

<div className="flex gap-3">

<button

onClick={onFeature}

className="bg-yellow-500 text-white px-5 py-2 rounded-xl"

>

<FaStar className="inline mr-2"/>

Feature

</button>

<button

onClick={onActivate}

className="bg-green-500 text-white px-5 py-2 rounded-xl"

>

<FaCheck className="inline mr-2"/>

Activate

</button>

<button

onClick={onDeactivate}

className="bg-gray-500 text-white px-5 py-2 rounded-xl"

>

<FaBan className="inline mr-2"/>

Deactivate

</button>

<button

onClick={onDelete}

className="bg-red-500 text-white px-5 py-2 rounded-xl"

>

<FaTrash className="inline mr-2"/>

Delete

</button>

</div>

</div>

);

}

export default BulkSubCategoryActions;