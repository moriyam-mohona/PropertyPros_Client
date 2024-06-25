import { useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const {
    data: properties = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/Advertisement");
        return data.filter(
          (property) =>
            property.status === "Verified" || property.status === "Advertised"
        );
      } catch (error) {
        throw new Error("Failed to fetch advertisement data");
      }
    },
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProperties = filteredProperties.sort((a, b) => {
    const [minA, maxA] = a.priceRange.split("-").map(Number);
    const [minB, maxB] = b.priceRange.split("-").map(Number);
    const avgA = (minA + maxA) / 2;
    const avgB = (minB + maxB) / 2;

    if (sortOrder === "asc") {
      return avgA - avgB;
    } else if (sortOrder === "desc") {
      return avgB - avgA;
    } else {
      return 0;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Failed to fetch advertisement data</div>;
  }

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="mt-20">
        <SectionTitle
          heading={"All Properties"}
          subHeading="Check out our best service you can possibly order in building your company and don't forget to ask via our email or our customer service if you are interested in using our services"
        />
      </div>
      <div className="mb-5 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by location"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded"
        />
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border p-2 rounded"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {sortedProperties.map((property) => (
          <div
            key={property._id}
            className="border rounded-md flex flex-col p-5"
          >
            {/* Display each property */}
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full flex-shrink-0 h-80 mb-4"
            />
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-2xl mb-2">{property.title}</h3>
                <p className="mb-2 text-lg">
                  <span className="font-bold">Location:</span>{" "}
                  {property.location}
                </p>
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={property.agentImage}
                    alt={property.agentName}
                    className="w-10 h-10 rounded-full mb-2"
                  />
                  <p className="mb-2 text-lg">
                    <span className="font-bold"></span> {property.agentName}
                  </p>
                </div>
                <p className="mb-2">
                  <span className="font-bold">Verification Status:</span>{" "}
                  {property.status}
                </p>
              </div>
              <p className="mb-2 text-lg">
                <span className="font-bold">Price Range:</span>{" "}
                {property.priceRange}
              </p>
              <Link
                to={`/details/${property._id}`}
                className="btn btn-primary bg-blue-950 text-lg text-white opacity-50 self-start "
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
