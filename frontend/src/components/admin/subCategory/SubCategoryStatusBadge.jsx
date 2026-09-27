function SubCategoryStatusBadge({

status,

}){

return(

<span

className={`

px-4

py-2

rounded-full

font-semibold

text-sm

${

status==="Active"

?

"bg-green-100 text-green-600"

:

"bg-red-100 text-red-600"

}

`}

>

{status}

</span>

);

}

export default SubCategoryStatusBadge;