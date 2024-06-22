import { useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePropertyForm = () => {
  const { user } = useAuth();
  const [property, setProperty] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axiosCommon(`/api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const imageUrl = form.imageUrl.value;
    const priceRange = form.priceRange.value;
    const updateData = {
      title,
      location,
      imageUrl,
      priceRange,
    };

    axiosCommon
      .put(`/api/properties/${id}`, updateData)
      .then((res) => {
        toast.success("Property updated successfully!");
      })
      .catch((err) => {
        toast.error("Error updating property.");
        console.error("Error updating property:", err);
      });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Update Property</h1>
      <form className="max-w-md mx-auto" onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700">Property Title</label>
          <input
            type="text"
            name="title"
            className="w-full border border-gray-300 p-2"
            defaultValue={property.title}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property Location</label>
          <input
            type="text"
            name="location"
            className="w-full border border-gray-300 p-2"
            defaultValue={property.location}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className="w-full border border-gray-300 p-2"
            defaultValue={property.imageUrl}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Agent Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2"
            defaultValue={user.displayName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Agent Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2"
            defaultValue={user.email}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price Range</label>
          <input
            type="text"
            name="priceRange"
            className="w-full border border-gray-300 p-2"
            defaultValue={property.priceRange}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Update Property
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdatePropertyForm;
