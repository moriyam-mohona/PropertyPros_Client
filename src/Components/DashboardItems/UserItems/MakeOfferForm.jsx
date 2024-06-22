import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

const MakeOfferForm = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [offeredAmount, setOfferedAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch property details based on id
  useEffect(() => {
    axiosCommon
      .get(`/Advertisement/${id}`)
      .then((response) => setProperty(response.data))
      .catch((error) => console.error("Error fetching property data:", error));
  }, [id]);

  const handleSubmit = () => {
    // Validate offered amount against price range
    const [minPrice, maxPrice] = property.priceRange.split("-");
    if (
      offeredAmount < minPrice ||
      offeredAmount > maxPrice ||
      offeredAmount === ""
    ) {
      setErrorMessage("Offered amount must be within the price range");
      return;
    }

    // Implement offer submission
    console.log("Submitting offer...");
    // Perform API call to save offer data
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center mt-24">
        Make an Offer
      </h1>
      <div className="max-w-md mx-auto">
        {property && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Property Title</label>
              <input
                type="text"
                className="form-input mt-1 block w-full border-gray-300 rounded-md"
                defaultValue={property.title}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Property Location</label>
              <input
                type="text"
                className="form-input mt-1 block w-full border-gray-300 rounded-md"
                defaultValue={property.location}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Agent Name</label>
              <input
                type="text"
                className="form-input mt-1 block w-full border-gray-300 rounded-md"
                defaultValue={property.agentName}
                readOnly
              />
            </div>
          </>
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Make Offer
        </button>
      </div>
    </div>
  );
};

export default MakeOfferForm;
