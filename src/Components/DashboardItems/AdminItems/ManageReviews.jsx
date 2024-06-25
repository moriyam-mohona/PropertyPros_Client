import React, { useState, useEffect } from "react";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import SectionTitle from "../../SectionTitle/SectionTitle";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);

  // Function to fetch reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await axiosCommon.get("/reviews"); // Assuming your backend endpoint is '/reviews'
      setReviews(response.data); // Update state with fetched reviews
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Handle error gracefully, show error message or retry logic
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Function to handle review deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosCommon.delete(`/reviews/${reviewId}`); // Assuming DELETE endpoint '/reviews/:id'
      // Remove the deleted review from state
      setReviews(reviews.filter((review) => review._id !== reviewId));
      // Optionally: Show success message or update UI
    } catch (error) {
      console.error("Error deleting review:", error);
      // Handle error gracefully, show error message
    }
  };

  return (
    <div className="container mx-auto py-2 px-2">
      <SectionTitle heading="Manage Reviews" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-base-100 shadow-2xl rounded-lg"
          >
            <figure className="mt-3 flex justify-center">
              <img
                src={review.reviewerImg}
                alt="Reviewer"
                className="w-20 h-20 rounded-full object-cover"
              />
            </figure>
            <div className="card-body text-center">
              <div className="reviewer-info mb-3">
                <p className="font-bold">Email: {review.userEmail}</p>
                <p className="font-bold">Name: {review.reviewerName}</p>
              </div>
              <p className="mb-4">{review.reviewDescription}</p>
              <div className="card-actions justify-center">
                <button
                  className="w-full btn btn-primary bg-blue-950 opacity-70 mb-3"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
