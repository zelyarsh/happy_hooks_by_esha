import ReviewTable from "../../components/admin/reviews/ReviewTable";
import { useReviews } from "../../context/ReviewContext";
import { FaStar, FaCommentDots, FaThumbsUp } from "react-icons/fa";

function Reviews() {
  const { totalReviews, averageRating, approvedReviews } = useReviews();

  return (
    <div className="space-y-8">
      <div>
        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">Customer Feedback</p>
        <h1 className="text-4xl font-bold mt-2">Reviews Management</h1>
        <p className="text-gray-500 mt-2">View, approve or remove customer reviews.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow"><FaCommentDots className="text-4xl text-pink-500"/><h2 className="text-3xl font-bold mt-4">{totalReviews}</h2><p className="text-gray-500 mt-2">Total Reviews</p></div>
        <div className="bg-white rounded-3xl p-6 shadow"><FaStar className="text-4xl text-yellow-400"/><h2 className="text-3xl font-bold mt-4">{averageRating}</h2><p className="text-gray-500 mt-2">Average Rating</p></div>
        <div className="bg-white rounded-3xl p-6 shadow"><FaThumbsUp className="text-4xl text-green-500"/><h2 className="text-3xl font-bold mt-4">{approvedReviews}</h2><p className="text-gray-500 mt-2">Approved</p></div>
      </div>

      <ReviewTable />
    </div>
  );
}

export default Reviews;
