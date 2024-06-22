import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import u1 from "../../../../public/Assets/u1.png";
import u2 from "../../../../public/Assets/u2.png";
import u3 from "../../../../public/Assets/u3.png";
import u4 from "../../../../public/Assets/u4.png";
const Unique = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mx-auto">
      <SectionTitle
        heading={"What Make Us Different?"}
        subHeading="Check out our best service you can possibly orders in building
your company and don't forget to ask via our email or our
customer service if you are interested in using our services"
      ></SectionTitle>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 ">
            <img
              src={u1}
              alt="Shoes"
              className="rounded-xl bg-blue-950 opacity-50 p-3"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Experienced</h2>
            <p>
              Our experience of 25 years of building and making achievements in
              the world of development
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 ">
            <img
              src={u2}
              alt="Shoes"
              className="rounded-xl bg-blue-950 opacity-50 p-3"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Competitive Price</h2>
            <p>
              The prices we offer you are very competitive without reducing the
              quality of the Companies work in the slightest.
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 ">
            <img
              src={u3}
              alt="Shoes"
              className="rounded-xl bg-blue-950 opacity-50 p-3"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">On Time</h2>
            <p>We prioritize the quality of our work and finish it on time</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 ">
            <img
              src={u4}
              alt="Shoes"
              className="rounded-xl bg-blue-950 opacity-50 p-3"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Best Materials</h2>
            <p>
              The material determines the building itself so we recommend that
              you use the best & quality materials in its class.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unique;
