function CategoryStatusBadge({

status,

}){

return(

<span

className={`

px-4

py-2

rounded-full

text-sm

font-semibold

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

export default CategoryStatusBadge;