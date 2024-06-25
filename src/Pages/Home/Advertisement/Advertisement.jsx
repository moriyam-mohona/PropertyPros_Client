import { useState, useEffect } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import AdvertisementCard from "./AdvertisementCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const [advertisementData, setAdvertisementData] = useState([]);
  const axiosSecure = useAxiosSecure();

  const {
    data: fetchedAdvertisement = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/Advertisement");
        return data.filter(
          (advertisement) => advertisement.status === "Advertised"
        );
      } catch (error) {
        throw new Error("Failed to fetch advertisement data");
      }
    },
  });

  useEffect(() => {
    if (Array.isArray(fetchedAdvertisement)) {
      setAdvertisementData(fetchedAdvertisement);
    }
  }, [fetchedAdvertisement]);

  if (isLoading) {
    return <div>Loading...</div>; // Consider using a spinner component here
  }

  if (isError) {
    return <div>Error: Failed to fetch advertisement data</div>;
  }

  return (
    <div>
      <SectionTitle
        subHeading="What Our Client Say"
        heading={"Advertisement Section"}
      />
      <div className="mt-20 mb-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:mx-auto">
        {advertisementData.slice(0, 6).map((advertisement) => (
          <AdvertisementCard
            key={advertisement._id}
            advertisement={advertisement}
          />
        ))}
      </div>
      <Link
        to="/allProperties"
        className="btn btn-primary bg-blue-950 opacity-50 text-xl flex item-center"
      >
        Show All →
      </Link>
    </div>
  );
};

export default Advertisement;
