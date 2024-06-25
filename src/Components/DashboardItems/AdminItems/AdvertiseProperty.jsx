import React, { useEffect, useState } from "react";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { toast } from "react-toastify";
import SectionTitle from "../../SectionTitle/SectionTitle";

const AdvertiseProperty = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = () => {
    axiosCommon("/Advertisement").then((res) =>
      setProperties(
        res.data.filter((property) => property.status === "Verified")
      )
    );
  };

  const handleAdvertise = async (id) => {
    axiosCommon
      .put(`/api/properties/${id}`, { status: "Advertised" })
      .then(() => {
        toast.success("Property verified successfully!");
        getProperties();
      })
      .catch((error) => {
        toast.error("Failed to verify property. Please try again.");
      });
  };

  return (
    <div className="container mx-auto py-8">
      <SectionTitle heading={"Advertise Property"} />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left border-b">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Property Image</th>
              <th className="px-4 py-3">Property Title</th>
              <th className="px-4 py-3">Price Range</th>
              <th className="px-4 py-3">Agent Name</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={property._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-4 py-3">{property.title}</td>
                <td className="px-4 py-3">{property.priceRange}</td>
                <td className="px-4 py-3">{property.agentName}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleAdvertise(property._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Advertise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperty;
