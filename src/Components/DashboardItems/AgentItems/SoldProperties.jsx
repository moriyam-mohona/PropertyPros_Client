import React, { useEffect, useState } from "react";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import useAuth from "../../../Hooks/useAuth";

const SoldProperties = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axiosCommon(`/offers?agentEmail=${user.email}`);
        // Filter properties where status is "paid"
        const filteredProperties = response.data.filter(
          (property) => property.status === "paid"
        );
        setProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching sold properties:", error);
      }
    };

    getProperties();
  }, [user.email]);

  // Function to calculate total sold amount
  const calculateTotalSoldAmount = () => {
    return properties.reduce(
      (acc, property) => acc + property.offeredAmount,
      0
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Sold Properties</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left border-b">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Property Title</th>
              <th className="px-4 py-3">Property Location</th>
              <th className="px-4 py-3">Buyer Email</th>
              <th className="px-4 py-3">Buyer Name</th>
              <th className="px-4 py-3">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={property._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{property.title}</td>
                <td className="px-4 py-3">{property.location}</td>
                <td className="px-4 py-3">{property.buyerEmail}</td>
                <td className="px-4 py-3">{property.buyerName}</td>
                <td className="px-4 py-3">${property.offeredAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <h1 className="text-xl font-semibold">
            Total Sold Amount: ${calculateTotalSoldAmount()}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SoldProperties;
