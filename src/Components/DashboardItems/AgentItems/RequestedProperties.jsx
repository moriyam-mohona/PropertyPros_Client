import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

const RequestedProperties = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useAuth();

  const getProperties = () => {
    axiosCommon(`/offers?agentEmail=${user.email}`).then((res) =>
      setProperties(res.data)
    );
  };

  useEffect(() => {
    getProperties();
  }, []);

  const updateOfferStatus = (id, status) => {
    axiosCommon
      .patch(`/offers/${id}`, { status })
      .then((response) => {
        console.log(`Offer ${status} successfully:`, response.data);
        // Update the local state to reflect the changes
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property._id === id ? { ...property, status } : property
          )
        );
      })
      .catch((error) => {
        console.error(`Error ${status} offer:`, error);
      });
  };

  const handleAccept = (id) => {
    updateOfferStatus(id, "accepted");
  };

  const handleReject = (id) => {
    updateOfferStatus(id, "rejected");
  };

  return (
    <div className="container mx-auto py-8">
      <h3 className="text-3xl font-bold mb-8 text-center mt-24">
        Requested Properties
      </h3>
      <div className="max-w-5xl mx-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Property Title</th>
              <th className="py-2 px-4 border-b">Property Location</th>
              <th className="py-2 px-4 border-b">Buyer Email</th>
              <th className="py-2 px-4 border-b">Buyer Name</th>
              <th className="py-2 px-4 border-b">Offered Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td className="py-2 px-4 border-b">{property.title}</td>
                <td className="py-2 px-4 border-b">{property.location}</td>
                <td className="py-2 px-4 border-b">{property.buyerEmail}</td>
                <td className="py-2 px-4 border-b">{property.buyerName}</td>
                <td className="py-2 px-4 border-b">{property.offeredAmount}</td>
                <td className="py-2 px-4 border-b">{property.status}</td>
                <td className="py-2 px-4 border-b">
                  {property.status === "pending" && (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                        onClick={() => handleAccept(property._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleReject(property._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;
