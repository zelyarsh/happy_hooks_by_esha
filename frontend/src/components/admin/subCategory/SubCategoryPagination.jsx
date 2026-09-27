function SubCategoryPagination(){

return(

<div className="flex justify-between items-center mt-8">


<p className="text-gray-500">

Showing 1 - 10 Sub Categories

</p>


<div className="flex gap-3">


<button className="border px-5 py-2 rounded-xl">

Previous

</button>



<button className="bg-pink-500 text-white px-5 py-2 rounded-xl">

1

</button>



<button className="border px-5 py-2 rounded-xl">

2

</button>



<button className="border px-5 py-2 rounded-xl">

Next

</button>



</div>


</div>

);


}


export default SubCategoryPagination;