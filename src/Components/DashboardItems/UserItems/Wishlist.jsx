import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch wishlist data from the server
    axios
      .get("http://localhost:5000/wishlist")
      .then((response) => setWishlist(response.data))
      .catch((error) => console.error("Error fetching wishlist data:", error));
  }, []);

  const handleRemove = (id) => {
    // Implement the remove functionality
    axios
      .delete(`http://localhost:5000/wishlist/${id}`)
      .then((response) => {
        setWishlist(wishlist.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Error removing item:", error));
  };

  //   const handleMakeOffer = (id) => {
  //     // Implement the make offer functionality
  //     console.log(`Making an offer for property with id: ${id}`);
  //     // Navigate to the offer page with property details and offer form
  //   };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((property) => (
          <div
            key={property._id}
            className="card bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Location:</strong> {property.location}
              </p>
              <div className="flex items-center mb-2">
                {" "}
                <strong className="mr-2">Agent:</strong>
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-10 h-10 rounded-full mr-2"
                />
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
                className="btn btn-primary w-full mb-2"
              >
                Make an Offer
              </Link>
              <button
                onClick={() => handleRemove(property._id)}
                className="btn bg-red-500 w-full text-white text-lg"
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
