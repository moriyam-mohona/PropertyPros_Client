import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosCommon = useAxiosCommon();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await axiosCommon.get(
          `/api/properties?agentEmail=${user.email}`
        );
        setProperties(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [user.email]);
  const handleDelete = async (id) => {
    try {
      await axiosCommon.delete(`/api/properties/${id}`);
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Added Properties
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties?.map((property) => (
          <div key={property._id} className="border p-4 rounded-lg shadow">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{property.title}</h2>
            <p className="text-gray-700 mb-1">Location: {property.location}</p>
            <p className="text-gray-700 mb-1">Agent: {property.agentName}</p>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 h-10 rounded-full mb-1"
            />
            <p className="text-gray-700 mb-1">Status: {property.status}</p>
            <p className="text-gray-700 mb-1">
              Price Range: {property.priceRange}
            </p>
            {property.verificationStatus !== "rejected" && (
              <button className="bg-blue-500 text-white p-2 mt-2 rounded">
                <label htmlFor="my_modal_6" className="btn">
                  Update
                </label>
                <input
                  type="checkbox"
                  id="my_modal_6"
                  className="modal-toggle"
                />{" "}
                <div className="modal" role="dialog">
                  <div className="modal-box">
                    <h3 className="fon t-bold text-lg">Hello!</h3>
                    <p className="py-4 text-black">
                      This modal works with a hidden checkbox!
                    </p>
                    <div className="modal-action">
                      <label htmlFor="my_modal_6" className="btn">
                        Close!
                      </label>
                    </div>
                  </div>
                </div>
              </button>
            )}
            <button
              className="bg-red-500 text-white p-2 mt-2 rounded"
              onClick={() => handleDelete(property._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
