// Maps a raw backend Product document (Mongo _id, populated categoryId /
// subCategoryId, images[]) into the flat shape the storefront UI
// (ProductCard, ProductDetails, etc.) was originally built around.

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/fce7f3/ec4899?text=No+Image";

export function mapStorefrontProduct(product) {
  return {
    ...product,
    id: product._id,
    image: product.images?.[0] || PLACEHOLDER_IMAGE,
    images: product.images?.length ? product.images : [PLACEHOLDER_IMAGE],
    category: product.categoryId?.name || "",
    categorySlug: product.categoryId?.slug || "",
    subCategory: product.subCategoryId?.name || "",
    badge: product.newArrival
      ? "New Arrival"
      : product.featured
      ? "Featured"
      : product.compareAtPrice > product.price
      ? "Sale"
      : "",
    isNew: !!product.newArrival,
    rating: product.rating ?? 5,
    reviews: product.reviewCount ?? 0,
  };
}

export function mapStorefrontProducts(products = []) {
  return products.filter((p) => p.status === "Active").map(mapStorefrontProduct);
}

export default mapStorefrontProduct;
