import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

const Review = () => {
  const [latestReviews, setLatestReviews] = useState([]);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await axiosCommon("/reviews?limit=3");
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-24">
        {latestReviews.length > 0 ? (
          latestReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="avatar mx-auto ">
                <div className="w-20 rounded-full ml-5">
                  <img
                    className="w-full h-full object-cover"
                    src={review.reviewerImg}
                    alt={`Image of ${review.reviewerName}`}
                  />
                </div>
              </div>
              <div className="px-6 py-1">
                <p className="text-gray-700 font-bold text-2xl">
                  {review.propertyTitle}
                </p>
              </div>
              <div className="px-6">
                <p className="text-gray-700">
                  <span className="font-bold">Reviewer:</span>{" "}
                  {review.reviewerName}
                </p>
              </div>

              <div className="px-6 py-4">
                <p className="text-gray-700">
                  <span className="font-bold">Review Description:</span>{" "}
                  {review.reviewDescription}
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
