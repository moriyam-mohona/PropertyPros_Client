import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/DashboardItems/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />

      <div className="flex-1 mx-auto">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
