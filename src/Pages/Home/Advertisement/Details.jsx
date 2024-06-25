import { useLoaderData } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import useAuth from "../../../Hooks/useAuth";

const Details = () => {
  const singleProperty = useLoaderData();
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const { user } = useAuth();
  const {
    _id,
    imageUrl,
    title,
    location,
    agentName,
    agentEmail,
    verificationStatus,
    priceRange,
    details,
  } = singleProperty;
  console.log(singleProperty);

  const addToWishlist = async () => {
    try {
      const response = await axiosCommon.post("/wishlist", {
        propertyId: _id,
        email: user.email,
        title,
        location,
        agentName,
        agentEmail,
        verificationStatus,
        priceRange,
        details,
        imageUrl,
      });

      if (response.status === 200) {
        toast.success("Property added to wishlist!");
        setIsWishlistModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to add property to wishlist.");
      console.error("Error adding property to wishlist:", error);
    }
  };

  const submitReview = async () => {
    try {
      const response = await axiosCommon.post(`/reviews`, {
        propertyId: _id,
        review,
      });

      if (response.status === 200) {
        toast.success("Review added successfully!");
        setIsReviewModalOpen(false);
        setReview(""); // Clear the review input
      }
    } catch (error) {
      toast.error("Failed to add review.");
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="container grid grid-cols-12 mx-auto">
      <div
        className="my-24 flex flex-col justify-center col-span-12 align-middle dark:bg-gray-300 bg-no-repeat bg-cover lg:col-span-6 lg:h-auto"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center center",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col items-center p-8 py-12 text-center text-white">
          <button className=" bg-blue-950 opacity-90 text-white text-lg px-5 py-3 rounded-lg">
            {verificationStatus}
          </button>
        </div>
      </div>
      <div className=" my-24 flex flex-col col-span-12 p-6 divide-y lg:col-span-6 lg:p-10 dark:divide-gray-300">
        <div className="pt-6 pb-4 space-y-2">
          <h1 className="py-4 text-3xl font-bold">{title}</h1>

          <h3 className="text-md font-medium">
            <span className="font-bold text-lg">Agent Name :</span> {agentName}
          </h3>
          <h3 className="text-md font-medium">
            <span className="font-bold text-lg">Agent Email :</span>{" "}
            {agentEmail}
          </h3>
          <p className="flex gap-3 items-center text-lg">
            <div className="">
              <CiLocationOn />
            </div>
            {location}
          </p>

          <p>
            <span className="font-bold text-lg">Price : </span>
            {priceRange}
          </p>
          <p>
            <span className="font-bold text-lg">Details : </span>
            {details}
          </p>
        </div>
        <button
          className="btn btn-primary bg-blue-950 opacity-50 text-white text-lg "
          onClick={() => setIsWishlistModalOpen(true)}
        >
          Add to wishlist
        </button>
        <button
          className="btn btn-primary bg-blue-950 opacity-50 text-white text-lg mt-4"
          onClick={() => setIsReviewModalOpen(true)}
        >
          Add a review
        </button>

        {/* Wishlist Modal */}
        {isWishlistModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Add to Wishlist</h3>
              <p className="mb-4">
                Are you sure you want to add this property to your wishlist?
              </p>
              <div className="flex justify-end">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setIsWishlistModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={addToWishlist}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Add a Review</h3>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setIsReviewModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={submitReview}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
