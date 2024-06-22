import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";
import Review from "../Review/Review";
import Service from "../Service/Service";
import Unique from "../Unique/Unique";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>PropertyPros | Home</title>
      </Helmet>
      <Banner></Banner>
      <Advertisement></Advertisement>
      <Service></Service>
      <Unique></Unique>
      <Review></Review>
    </div>
  );
};

export default Home;
