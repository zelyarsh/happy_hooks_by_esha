import { FaTimes } from "react-icons/fa";

function ViewCategoryModal({
  open,
  category,
  onClose,
}) {

  if (!open || !category) return null;


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
          sticky
          top-0
          bg-white
          z-10
        ">


          <h2 className="text-3xl font-black">

            Category Details

          </h2>


          <button

            onClick={onClose}

            className="
              w-10
              h-10
              rounded-xl
              hover:bg-pink-50
              transition
              flex
              items-center
              justify-center
            "

          >

            <FaTimes size={22}/>

          </button>


        </div>




        {/* Scrollable Content */}


        <div className="
          p-8
          overflow-y-auto
          flex-1
        ">



          <div className="grid lg:grid-cols-2 gap-8">



            {/* Image */}

            <div>


              <img

                src={category.image}

                alt={category.name}

                className="
                  w-full
                  h-[350px]
                  rounded-3xl
                  object-cover
                "

              />


            </div>





            {/* Details */}

            <div className="space-y-6">


              <div>

                <p className="text-gray-500">
                  Category Name
                </p>

                <h3 className="text-3xl font-black">
                  {category.name}
                </h3>

              </div>





              <div>

                <p className="text-gray-500">
                  Slug
                </p>

                <p className="font-semibold">
                  {category.slug}
                </p>

              </div>





              <div>

                <p className="text-gray-500">
                  Status
                </p>

                <p className="font-bold">
                  {category.status}
                </p>

              </div>





              <div>

                <p className="text-gray-500">
                  Products
                </p>

                <p className="font-bold">
                  {category.productCount || 0}
                </p>

              </div>





            </div>


          </div>






          {/* Description */}


          <div className="mt-8">


            <h3 className="font-bold text-xl">
              Description
            </h3>


            <p className="text-gray-600 mt-3 leading-relaxed">

              {category.description || "No description available"}

            </p>


          </div>




        </div>



      </div>


    </div>

  );

}


export default ViewCategoryModal;