import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";

const AdvertisementCard = ({ advertisement }) => {
  const {
    _id,
    imageUrl,
    title,
    location,
    agentName,
    agentImage,
    verificationStatus,
    priceRange,
  } = advertisement;

  return (
    <div className="rounded-3xl p-5 card bg-base-100 border-2 border-[#008EC4] shadow-xl flex flex-col gap-2 justify-around mx-1 mb-1 w-full ">
      <img
        src={imageUrl}
        alt={title}
        className="object-cover object-center w-full h-60 mb-5 rounded-xl"
      />
      <div className="flex items-start justify-between w-full gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="flex items-center gap-1 font-normal">
        <IoIosPeople />
        {location}
      </p>
      <div className="flex items-center space-x-4">
        <img
          src={agentImage}
          alt={agentName}
          className="w-10 h-10 rounded-full"
        />
        <h3 className="text-sm font-medium">{agentName}</h3>
      </div>
      <div className="flex justify-between">
        <p className="text-md font-medium flex gap-2 items-center">
          {verificationStatus}
        </p>
        <p className="text-md font-medium flex gap-2 items-center">
          {priceRange}
        </p>
      </div>
      <Link
        to={`/details/${advertisement._id}`}
        className="btn btn-primary bg-blue-950 opacity-50"
      >
        View Details →
      </Link>
    </div>
  );
};

export default AdvertisementCard;
