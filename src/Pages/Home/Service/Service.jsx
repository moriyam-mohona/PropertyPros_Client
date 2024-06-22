import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import c1 from "../../../../public/Assets/c1.png";
import c2 from "../../../../public/Assets/c2.png";
import c3 from "../../../../public/Assets/c3.png";

const Service = () => {
  return (
    <div>
      <SectionTitle
        heading={"Our Excellent Services"}
        subHeading="Check out our best service you can possibly orders in building
your company and don't forget to ask via our email or our
customer service if you are interested in using our services"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card glass">
          <figure>
            <img src={c1} alt="" className="w-full h-auto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Industrial</h2>
            <p>
              Industrial development is our main line of business. We do Factory
              Construction, Warehouse and others.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary bg-blue-950 opacity-50">
                View Details!
              </button>
            </div>
          </div>
        </div>
        <div className="card glass">
          <figure>
            <img src={c2} alt="car!" className="w-full h-auto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Commercial</h2>
            <p>
              Our experience building in the Commercial field includes
              Showrooms, Supermalls and Office Buildings.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary bg-blue-950 opacity-50">
                View Details!
              </button>
            </div>
          </div>
        </div>
        <div className="card glass">
          <figure>
            <img src={c3} alt="car!" className="w-full h-auto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Residential</h2>
            <p>
              Residential development is the beginning that has shaped us to
              this day. Our development includes Houses & Apartments
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary bg-blue-950 opacity-50">
                View details!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
