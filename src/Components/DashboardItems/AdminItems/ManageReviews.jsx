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
    <div>
      <SectionTitle heading={"Manage Reviews"} />
      <div className="review-cards">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-base-100 w-96 shadow-xl review-card"
          >
            <figure>
              <img src={review.reviewerImg} alt="Reviewer" />
            </figure>
            <div className="card-body">
              <div className="reviewer-info">
                <p>Email: {review.userEmail}</p>
                <p>Name: {review.reviewerName}</p>
              </div>
              <p>Review: {review.reviewDescription}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
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
