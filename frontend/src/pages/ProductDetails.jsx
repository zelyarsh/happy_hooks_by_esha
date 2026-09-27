import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductTabs from "../components/product/ProductTabs";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { mapStorefrontProduct } from "../utils/mapStorefrontProduct";

function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const rawProduct = products.find((item) => item._id === id);
  const product = useMemo(
    () => (rawProduct ? mapStorefrontProduct(rawProduct) : null),
    [rawProduct]
  );

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || product.image);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl text-gray-400">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-3xl">
        Product Not Found
      </div>
    );
  }

  const liked = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
      showToast({ type: "warning", title: "Removed from Wishlist", message: product.name });
    } else {
      addToWishlist(product);
      showToast({ type: "success", title: "Added to Wishlist", message: product.name });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="grid lg:grid-cols-2 gap-20">

        {/* ================= IMAGE GALLERY ================= */}

        <div className="grid md:grid-cols-[110px_1fr] gap-6">

          {/* Thumbnails */}

          <div className="flex md:flex-col gap-4">

            {(product.images || [product.image]).map((img, index) => (

              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === img
                    ? "border-pink-500 scale-105"
                    : "border-gray-200"
                }`}
              >

                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-24 h-24 object-cover"
                />

              </button>

            ))}

          </div>

          {/* Main Image */}

          <div className="rounded-3xl overflow-hidden shadow-xl group bg-pink-50">

            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[650px] object-cover transition duration-700 group-hover:scale-110"
            />

          </div>

        </div>

        {/* ================= PRODUCT INFO ================= */}

        <div>

          <p className="uppercase tracking-[5px] text-pink-500 font-semibold">

            {product.category}

          </p>

          <h1 className="text-5xl font-bold mt-3">

            {product.name}

          </h1>

          {/* Rating */}

          <div className="flex items-center gap-3 mt-5">

            <div className="flex text-yellow-400">

              {[...Array(product.rating)].map((_, index) => (
                <FaStar key={index} />
              ))}

            </div>

            <span className="text-gray-500">

              ({product.reviews} Reviews)

            </span>

          </div>

          {/* Price */}

          <h2 className="text-5xl font-bold text-pink-500 mt-8">

            Rs. {product.price}

          </h2>

          {/* Description */}

          <p className="text-gray-600 leading-8 mt-8">

            {product.description}

          </p>

          {/* Stock */}

          <div className="mt-8">

            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold">
                Out of Stock
              </span>
            )}

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-5 mt-10">

            <button
              onClick={() => {
                addToCart(product);
                showToast({ type: "success", title: "Added to Cart", message: product.name });
              }}
              disabled={product.stock <= 0}
              className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-10 py-4 rounded-full flex items-center gap-3 shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >

              <FaShoppingCart />

              Add To Cart

            </button>

            <button
              onClick={toggleWishlist}
              className={`border-2 px-10 py-4 rounded-full flex items-center gap-3 transition ${
                liked
                  ? "bg-pink-500 border-pink-500 text-white"
                  : "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
              }`}
            >

              <FaHeart />

              {liked ? "Wishlisted" : "Wishlist"}

            </button>

          </div>

          {/* Features */}

          <div className="mt-12 bg-pink-50 rounded-3xl p-8">

            <h3 className="text-2xl font-bold mb-6">

              Why You'll Love It

            </h3>

            <div className="space-y-4 text-gray-700">

              <p>🧶 Handmade with Premium Cotton Yarn</p>

              <p>🎁 Perfect Gift for Every Occasion</p>

              <p>💖 Carefully Crafted with Love</p>

              <p>🚚 Delivery All Over Pakistan</p>

              <p>🌸 Custom Orders Available</p>

              <p>♻ Eco-Friendly & Long Lasting</p>

            </div>

          </div>

        </div>

      </div>

      <ProductTabs product={product} />
      {/* ================= RELATED PRODUCTS ================= */}
      <RelatedProducts currentProduct={product} />
    </section>
  );
}

export default ProductDetails;
