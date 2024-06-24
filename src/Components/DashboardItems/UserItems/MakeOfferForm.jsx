import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

const MakeOfferForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [offeredAmount, setOfferedAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axiosCommon
        .get(`/wishlist/${id}`)
        .then((response) => setProperty(response.data))
        .catch((error) =>
          console.error("Error fetching property data:", error)
        );
    }
  }, [id]);
  // console.log(property);
  const handleSubmit = () => {
    if (!property) return;

    const [minPrice, maxPrice] = property.priceRange.split("-").map(Number);
    if (
      offeredAmount < minPrice ||
      offeredAmount > maxPrice ||
      offeredAmount === ""
    ) {
      setErrorMessage("Offered amount must be within the price range");
      return;
    }
    console.log(property.agentEmail);

    const offerDetails = {
      agentEmail: property.agentEmail,
      buyerEmail: user?.email,
      buyerName: user?.displayName,
      offeredAmount,
      buyingDate,
      title: property.title,
      location: property.location,
      status: "pending",
    };

    setIsLoading(true);
    axiosCommon
      .post("/offers", offerDetails)
      .then((response) => {
        console.log("Offer submitted successfully:", response.data);
        setIsLoading(false);
        // Redirect to "Property bought" page or show a success message
        // For example:
        // navigate('/success'); // If using react-router
      })
      .catch((error) => {
        console.error("Error submitting offer:", error);
        setIsLoading(false);
        setErrorMessage("Failed to submit the offer. Please try again.");
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center mt-24">
        Make an Offer
      </h1>
      <div className="max-w-md mx-auto">
        {property ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Property Title</label>
              <input
                type="text"
                className="form-input mt-1 block w-full border-gray-300 rounded-md"
                value={property.title}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Property Location</label>
              <input
                type="text"
                className="form-input mt-1 block w-full border-gray-300 rounded-md"
                value={property.location}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Agent Name</label>
              <input
                type="text"
                className="form-input mt-1 block w-full border-gray-300 rounded-md"
                value={property.agentName}
                readOnly
              />
            </div>
          </>
        ) : (
          <p>Loading property details...</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Offered Amount</label>
          <input
            type="number"
            className="form-input mt-1 block w-full border-gray-300 rounded-md"
            value={offeredAmount}
            onChange={(e) => setOfferedAmount(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Email</label>
          <input
            type="email"
            className="form-input mt-1 block w-full border-gray-300 rounded-md"
            value={user?.email || ""}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Name</label>
          <input
            type="text"
            className="form-input mt-1 block w-full border-gray-300 rounded-md"
            value={user?.displayName || ""}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buying Date</label>
          <input
            type="date"
            className="form-input mt-1 block w-full border-gray-300 rounded-md"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Make Offer"}
        </button>
      </div>
    </div>
  );
};

export default MakeOfferForm;
