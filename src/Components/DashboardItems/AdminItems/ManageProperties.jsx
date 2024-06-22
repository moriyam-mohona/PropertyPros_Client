import { useEffect, useState } from "react";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = () => {
    axiosCommon("/Advertisement").then((res) =>
      setProperties(
        res.data.filter((property) => property.status === "pending")
      )
    );
  };

  const handleVerify = (id) => {
    axiosCommon
      .put(`/api/properties/${id}`, { status: "Verified" })
      .then(() => {
        toast.success("Property verified successfully!");
        getProperties();
      })
      .catch((error) => {
        toast.error("Failed to verify property. Please try again.");
      });
  };

  const handleReject = (id) => {
    axiosCommon
      .put(`/api/properties/${id}`, { status: "Rejected" })
      .then(() => {
        toast.error("Property rejected successfully!");
        getProperties();
      })
      .catch((error) => {
        toast.error("Failed to reject property. Please try again.");
      });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Properties</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">#</th>
              <th className="px-4 py-2 text-left text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-gray-600">Location</th>
              <th className="px-4 py-2 text-left text-gray-600">Agent Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Agent Email</th>
              <th className="px-4 py-2 text-left text-gray-600">Price Range</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={property._id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{property.title}</td>
                <td className="px-4 py-2">{property.location}</td>
                <td className="px-4 py-2">{property.agentName}</td>
                <td className="px-4 py-2">{property.agentEmail}</td>
                <td className="px-4 py-2">{property.priceRange}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleVerify(property._id)}
                  >
                    Verify
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(property._id)}
                  >
                    Reject
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

export default ManageProperties;
