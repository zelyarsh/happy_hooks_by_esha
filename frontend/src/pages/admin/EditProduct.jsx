import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductPageForm from "../../components/admin/product/ProductPageForm";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();

  const product = getProduct(id);

  if (!product) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <p className="text-gray-500 mt-2">
          This product may have been deleted.
        </p>
        <button
          onClick={() => navigate("/admin/products")}
          className="mt-6 px-6 py-3 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return <ProductPageForm product={product} />;
}

export default EditProduct;
