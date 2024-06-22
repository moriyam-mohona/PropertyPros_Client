import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosCommon = useAxiosCommon();
  const MySwal = withReactContent(Swal);

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
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [user.email]);

  const handleDelete = async (id) => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this property!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosCommon.delete(`/api/properties/${id}`);
          setProperties(properties.filter((property) => property._id !== id));
          MySwal.fire("Deleted!", "Your property has been deleted.", "success");
        }
      });
    } catch (error) {
      console.error("Error deleting property:", error);
      MySwal.fire("Error!", "Failed to delete property.", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Added Properties
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => (
          <div
            key={property._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-48 object-cover mb-4 rounded"
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
              <Link
                to={`/dashboard/updateProperty/${property._id}`}
                className="bg-blue-500 text-white p-2 mt-2 rounded block text-center"
              >
                Update
              </Link>
            )}
            <button
              className="bg-red-500 text-white p-2 mt-2 rounded block text-center"
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
