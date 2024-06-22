import "./Banner.css"; // Import the CSS file
import hero from "../../../../public/Assets/hero.jpg";

const Banner = () => {
  return (
    <div className="relative flex justify-center items-center">
      <img src={hero} className="banner-image object-cover w-full h-full" />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-4">
          We Provide Architectural Design and Construction
        </h2>
        <p className="mb-8 max-w-2xl">
          More than 100 building and housing projects that we have built. The
          building owner chose us over other contractors in Jakarta, because our
          work is different.
        </p>
        <button className="btn btn-outline text-white font-bold text-xl px-8 py-3">
          Discover More
        </button>
      </div>
    </div>
  );
};

export default Banner;
