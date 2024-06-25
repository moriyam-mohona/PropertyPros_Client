import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import SectionTitle from "../../SectionTitle/SectionTitle";

const OfferedProperties = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useAuth();

  const getProperties = () => {
    axiosCommon(`/offers/buyer?buyerEmail=${user.email}`).then((res) =>
      setProperties(res.data)
    );
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handlePayment = async (property) => {
    try {
      // Update offer status to "paid"
      await axiosCommon.patch(`/offers/${property._id}`, {
        status: "paid",
      });

      // Refresh properties list after status update
      getProperties();
    } catch (error) {
      console.error("Error updating offer status:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <SectionTitle heading={"Property Bought"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {property.location}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Agent:</strong> {property.agentName}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Offered Amount:</strong> ${property.offeredAmount}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Status:</strong> {property.status}
              </p>
              {property.status === "accepted" && !property.transactionId && (
                <button
                  onClick={() => handlePayment(property)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  Pay
                </button>
              )}
              {property.transactionId && (
                <p className="text-gray-600">
                  <strong>Transaction ID:</strong> {property.transactionId}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferedProperties;
