import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    console.log(user.email);
    axiosCommon
      .get(`/wishlist/byEmail/${user.email}`)
      .then((response) => setWishlist(response.data))
      .catch((error) => console.error("Error fetching wishlist data:", error));
  }, [user.email]);

  const handleRemove = (id) => {
    axiosCommon
      .delete(`/wishlist/${id}`)
      .then((response) => {
        setWishlist(wishlist.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Error removing item:", error));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <SectionTitle heading={"My Wishlist"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((property) => (
          <div
            key={property._id}
            className="card bg-white shadow-lg rounded-lg overflow-hidden w-full"
          >
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Location:</strong> {property.location}
              </p>
              <div className="flex items-center mb-2">
                <strong className="mr-2">Agent:</strong>

                <p className="text-gray-700">{property.agentName}</p>
              </div>
              <p className="text-gray-700 mb-1">
                <strong>Verification Status:</strong>{" "}
                {property.verificationStatus}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Price Range:</strong> {property.priceRange}
              </p>
              <Link
                to={`/offer/${property._id}`}
                className="btn btn-primary w-full mb-2 bg-blue-950 opacity-70"
              >
                Make an Offer
              </Link>
              <button
                onClick={() => handleRemove(property._id)}
                className="btn bg-red-500 w-full text-white text-l "
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
