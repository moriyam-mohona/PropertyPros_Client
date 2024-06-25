import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

const Review = () => {
  const [latestReviews, setLatestReviews] = useState([]);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await axiosCommon("/reviews");
        if (response.status === 200) {
          setLatestReviews(response.data);
        }
      } catch (error) {
        console.error("Error fetching latest reviews:", error);
      }
    };

    fetchLatestReviews();
  }, []);

  return (
    <div>
      <SectionTitle
        heading={"Latest User Reviews"}
        subHeading="Check out our latest user reviews."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestReviews.length > 0 ? (
          latestReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Reviewer Name */}
              <div className="px-6 py-4">
                <p className="text-gray-700 font-bold">
                  Reviewer: {review.reviewerName}
                </p>
              </div>

              {/* Review Description */}
              <div className="px-6 py-4">
                <p className="text-gray-700 font-bold">
                  Review Description: {review.reviewDescription}
                </p>
              </div>

              {/* Property Title */}
              <div className="px-6 py-4">
                <p className="text-gray-700 font-bold">
                  Property Title: {review.propertyTitle}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No latest reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
