import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { RiDeleteBin6Line } from "react-icons/ri";
import SectionTitle from "../../SectionTitle/SectionTitle";

const MyReviews = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleDeleteReview = async (reviewId) => {
    setLoading(true); // Show loading state
    try {
      const response = await axiosCommon.delete(`/reviews/${reviewId}`);
      if (response.status === 200) {
        toast.success("Review deleted successfully!");
        setUserReviews(userReviews.filter((review) => review._id !== reviewId));
      } else {
        toast.error("Failed to delete review.");
      }
    } catch (error) {
      toast.error("Failed to delete review.");
      console.error("Error deleting review:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <SectionTitle heading={"My Reviews"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userReviews.length > 0 ? (
          userReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="px-6 py-4">
                <div className="mb-4">
                  <p className="text-gray-700">
                    <span className="font-bold">Property Title:</span>{" "}
                    {review.propertyTitle}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700">
                    <span className="font-bold">Agent Name:</span>{" "}
                    {review.agentName}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700">
                    <span className="font-bold">Review Time:</span>{" "}
                    {new Date(review.reviewTime).toLocaleString()}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700">
                    <span className="font-bold">Review Description:</span>{" "}
                    {review.reviewDescription}
                  </p>
                </div>
                <button
                  className={`bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleDeleteReview(review._id)}
                  disabled={loading}
                >
                  {loading ? (
                    "Deleting..."
                  ) : (
                    <>
                      <RiDeleteBin6Line className="inline-block mr-1" />
                      Delete
                    </>
                  )}
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
