import { FaStar, FaCheck, FaTrash, FaTimes } from "react-icons/fa";
import { useReviews } from "../../../context/ReviewContext";

function ReviewCard({ review }) {
  const { approveReview, rejectReview, deleteReview } = useReviews();
  const statusColors = { Approved: "bg-green-100 text-green-600", Pending: "bg-yellow-100 text-yellow-600", Rejected: "bg-red-100 text-red-600" };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{review.customerName}</h2>
          <p className="text-gray-500">{review.productId?.name || "Product"}</p>
        </div>
        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColors[review.status]}`}>{review.status}</span>
      </div>

      <div className="flex gap-1 mt-4 text-yellow-400">
        {[...Array(review.rating)].map((_, i) => (<FaStar key={i} />))}
      </div>

      {review.title && <p className="font-semibold mt-4">{review.title}</p>}
      <p className="text-gray-600 leading-7 mt-2">{review.comment}</p>
      <p className="text-gray-400 text-sm mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>

      <div className="flex justify-end gap-3 mt-8">
        <button onClick={() => approveReview(review._id)} disabled={review.status === "Approved"} className="bg-green-500 text-white w-11 h-11 rounded-xl hover:bg-green-600 transition disabled:opacity-40" title="Approve"><FaCheck /></button>
        <button onClick={() => rejectReview(review._id)} disabled={review.status === "Rejected"} className="bg-yellow-500 text-white w-11 h-11 rounded-xl hover:bg-yellow-600 transition disabled:opacity-40" title="Reject"><FaTimes /></button>
        <button onClick={() => { if (window.confirm("Delete this review?")) deleteReview(review._id); }} className="bg-red-500 text-white w-11 h-11 rounded-xl hover:bg-red-600 transition" title="Delete"><FaTrash /></button>
      </div>
    </div>
  );
}

export default ReviewCard;
