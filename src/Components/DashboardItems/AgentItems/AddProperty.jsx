import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionTitle from "../../SectionTitle/SectionTitle";

const AddProperty = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = {
      title,
      location,
      imageUrl,
      agentName: user.displayName,
      agentEmail: user.email,
      priceRange,
    };

    try {
      const response = await axiosCommon.post("/api/properties", propertyData);
      toast.success("Property added successfully!");
      console.log("Property added successfully:", response.data);
    } catch (error) {
      toast.error("Error adding property. Please try again.");
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <SectionTitle heading={"Add Property"} />

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Property Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property Location</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property Image URL</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Agent Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2"
            value={user.displayName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Agent Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2"
            value={user.email}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price Range</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
