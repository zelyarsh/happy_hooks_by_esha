import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getProductReviews, createReview } from "../../services/reviewService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [form, setForm] = useState({ rating: 5, title: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const productId = product._id || product.id;

  const loadReviews = () => {
    setReviewsLoading(true);
    getProductReviews(productId)
      .then((data) => setReviews(data.reviews || []))
      .catch((error) => console.error("Failed to load reviews:", error))
      .finally(() => setReviewsLoading(false));
  };

  useEffect(() => {
    if (productId) loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!form.comment.trim()) return;

    setSubmitting(true);

    try {
      await createReview({ productId, ...form });
      showToast({
        type: "success",
        title: "Review submitted",
        message: "Thanks! Your review will appear once approved.",
      });
      setForm({ rating: 5, title: "", comment: "" });
    } catch (error) {
      showToast({
        type: "error",
        title: "Couldn't submit review",
        message: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping" },
    { id: "care", label: "Care Guide" },
  ];

  return (
    <section className="mt-24">

      {/* Tabs */}

      <div className="flex flex-wrap gap-4 border-b pb-4">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === tab.id
                ? "bg-pink-500 text-white"
                : "bg-pink-50 hover:bg-pink-100"
            }`}
          >
            {tab.label}
          </button>

        ))}

      </div>

      {/* Content */}

      <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

        {activeTab === "description" && (
          <div>

            <h3 className="text-2xl font-bold mb-5">
              Product Description
            </h3>

            <p className="text-gray-600 leading-8">
              {product.description}
            </p>

          </div>
        )}

        {activeTab === "reviews" && (
          <div>

            <h3 className="text-2xl font-bold mb-6">
              Customer Reviews
            </h3>

            {reviewsLoading ? (
              <p className="text-gray-400">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-gray-400 mb-8">Be the first to review this product.</p>
            ) : (
              <div className="space-y-6 mb-10">

                {reviews.map((review) => (
                  <div key={review._id} className="border-b pb-4">

                    <p className="font-semibold">
                      {"⭐".repeat(review.rating)} {review.customerName}
                    </p>

                    {review.title && (
                      <p className="font-medium mt-1">{review.title}</p>
                    )}

                    <p className="text-gray-600 mt-2">
                      {review.comment}
                    </p>

                  </div>
                ))}

              </div>
            )}

            {isAuthenticated ? (
              <form onSubmit={submitReview} className="border-t pt-8 space-y-4">

                <h4 className="text-xl font-bold">Write a Review</h4>

                <select
                  value={form.rating}
                  onChange={(e) => setForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                  className="border rounded-xl px-5 py-3"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{n} Stars</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Review title (optional)"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full border rounded-xl px-5 py-3"
                />

                <textarea
                  rows={4}
                  placeholder="Share your experience with this product..."
                  value={form.comment}
                  onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
                  className="w-full border rounded-xl px-5 py-3"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-70 flex items-center gap-2"
                >
                  <FaStar />
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>

              </form>
            ) : (
              <p className="text-gray-500 border-t pt-6">
                Please log in to leave a review.
              </p>
            )}

          </div>
        )}

        {activeTab === "shipping" && (

          <div>

            <h3 className="text-2xl font-bold mb-5">
              Shipping Information
            </h3>

            <ul className="space-y-4 text-gray-600">

              <li>🚚 Delivery across Pakistan</li>

              <li>📦 Secure Gift Packaging</li>

              <li>⏰ 3–5 Working Days</li>

              <li>💳 Cash on Delivery Available</li>

            </ul>

          </div>

        )}

        {activeTab === "care" && (

          <div>

            <h3 className="text-2xl font-bold mb-5">
              Care Instructions
            </h3>

            <ul className="space-y-4 text-gray-600">

              <li>🧶 Handle with care.</li>

              <li>☀ Keep away from direct sunlight.</li>

              <li>💧 Avoid excessive moisture.</li>

              <li>🧼 Spot clean gently if needed.</li>

            </ul>

          </div>

        )}

      </div>

    </section>
  );
}

export default ProductTabs;
