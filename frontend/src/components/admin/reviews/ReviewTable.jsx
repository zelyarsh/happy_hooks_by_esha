import { useMemo, useState } from "react";
import { useReviews } from "../../../context/ReviewContext";
import ReviewCard from "./ReviewCard";

function ReviewTable() {
  const { reviews } = useReviews();
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    if (!statusFilter) return reviews;
    return reviews.filter((r) => r.status === statusFilter);
  }, [reviews, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500">
          <option value="">All Reviews</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl shadow p-16 text-center text-gray-400">No reviews match this filter.</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {filtered.map((review) => (<ReviewCard key={review._id} review={review} />))}
        </div>
      )}
    </div>
  );
}

export default ReviewTable;
