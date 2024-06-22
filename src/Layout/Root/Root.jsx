import NavBar from "../../Pages/Shared/NavBar/NavBar.jsx";
import Footer from "../../Pages/Shared/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
