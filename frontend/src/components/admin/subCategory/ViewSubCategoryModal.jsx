import { FaTimes } from "react-icons/fa";
import { useCategories } from "../../../context/CategoryContext";


function ViewSubCategoryModal({
  open,
  subCategory,
  onClose,
}) {


const { categories } = useCategories();


if(!open || !subCategory) return null;



const parentCategory = categories.find(
item => item.id === subCategory.categoryId
);



return (

<div className="
fixed
inset-0
z-50
bg-black/50
flex
items-center
justify-center
p-4
">


<div className="
bg-white
rounded-3xl
w-full
max-w-4xl
max-h-[90vh]
overflow-hidden
shadow-2xl
flex
flex-col
">



{/* Header */}

<div className="
flex
justify-between
items-center
p-6
border-b
bg-white
sticky
top-0
z-10
">


<h2 className="text-3xl font-black">

Sub Category Details

</h2>


<button

onClick={onClose}

className="
w-10
h-10
rounded-xl
hover:bg-pink-50
flex
items-center
justify-center
"

>

<FaTimes size={22}/>

</button>


</div>





{/* Scroll Content */}

<div className="
p-8
overflow-y-auto
flex-1
">



<img

src={subCategory.image}

alt={subCategory.name}

className="
w-56
h-56
rounded-3xl
object-cover
"

/>





<div className="
grid
md:grid-cols-2
gap-8
mt-8
">



<div>

<p className="text-gray-500">
Sub Category Name
</p>

<h3 className="text-2xl font-black">
{subCategory.name}
</h3>

</div>





<div>

<p className="text-gray-500">
Parent Category
</p>

<h3 className="text-xl font-bold">
{parentCategory?.name}
</h3>

</div>





<div>

<p className="text-gray-500">
Products
</p>

<h3 className="font-bold">
{subCategory.productCount}
</h3>

</div>





<div>

<p className="text-gray-500">
Status
</p>

<h3 className="font-bold">
{subCategory.status}
</h3>

</div>





<div>

<p className="text-gray-500">
Featured
</p>

<h3 className="font-bold">

{subCategory.featured ? "⭐ Yes" : "No"}

</h3>

</div>





<div>

<p className="text-gray-500">
Created Date
</p>

<h3 className="font-bold">
{subCategory.createdAt}
</h3>

</div>



</div>





<div className="mt-8">

<h3 className="text-xl font-bold">
Description
</h3>


<p className="text-gray-600 mt-3 leading-relaxed">

{subCategory.description || "No description available"}

</p>


</div>




</div>



</div>


</div>

);


}


export default ViewSubCategoryModal;