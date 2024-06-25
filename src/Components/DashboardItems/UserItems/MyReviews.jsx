import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyReviews = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);

  // Fetch user's reviews on component mount
  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axiosCommon.get(`/reviews/user/${user.email}`);
        if (response.status === 200) {
          setUserReviews(response.data);
        }
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    };

    fetchUserReviews();
  }, [user.email]);

  // Function to handle review deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axiosCommon.delete(`/reviews/${reviewId}`);
      if (response.status === 200) {
        toast.success("Review deleted successfully!");
        // Remove the deleted review from state
        setUserReviews(userReviews.filter((review) => review._id !== reviewId));
      }
    } catch (error) {
      toast.error("Failed to delete review.");
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userReviews.length > 0 ? (
          userReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="px-6 py-4">
                <div className="mb-4">
                  <p className="text-gray-700 font-bold">
                    Property Title: {review.propertyTitle}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 font-bold">
                    Agent Name: {review.agentName}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 font-bold">
                    Review Time: {new Date(review.reviewTime).toLocaleString()}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 font-bold">
                    Review Description: {review.reviewDescription}
                  </p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-2"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  <RiDeleteBin6Line className="inline-block mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
