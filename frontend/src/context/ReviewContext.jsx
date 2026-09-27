import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  getReviews,
  updateReviewStatus,
  deleteReview as deleteReviewAPI,
} from "../services/reviewService";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const setStatus = async (id, status) => {
    try {
      const data = await updateReviewStatus(id, status);
      setReviews((prev) => prev.map((r) => (r._id === id ? data.review : r)));
      return { success: true };
    } catch (error) {
      console.error("Failed to update review:", error);
      return { success: false, message: error.message };
    }
  };

  const approveReview = (id) => setStatus(id, "Approved");
  const rejectReview = (id) => setStatus(id, "Rejected");

  const deleteReview = async (id) => {
    try {
      await deleteReviewAPI(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete review:", error);
      return { success: false, message: error.message };
    }
  };

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter((r) => r.status === "Approved").length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const value = useMemo(
    () => ({
      reviews,
      loading,
      fetchReviews,
      approveReview,
      rejectReview,
      deleteReview,
      totalReviews,
      approvedReviews,
      averageRating,
    }),
    [reviews, loading]
  );

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

export const useReviews = () => useContext(ReviewContext);
