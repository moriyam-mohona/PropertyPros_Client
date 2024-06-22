import { useState } from "react";
import { Link } from "react-router-dom";
import UserMenu from "../Menu/UserMenu";
import AgentMenu from "../Menu/AgentMenu";
import AdminMenu from "../Menu/AdminMenu";
import useRole from "../../../Hooks/useRole";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [role] = useRole();
  console.log(role);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Sidebar */}
      <div className="flex flex-col justify-between bg-gray-100 w-64 px-2 py-4 my-20">
        <div>
          <div className="w-full hidden md:flex shadow-lg rounded-lg justify-center items-center mx-auto mb-4">
            <Link to="/">
              <img
                src="../../../../public/Assets/logo.png"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
            <h2 className="text-xl font-bold">PropertyPros</h2>
          </div>
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <UserMenu></UserMenu>
              {role === "Agent" && <AgentMenu></AgentMenu>}
              {role === "Admin" && <AdminMenu></AdminMenu>}
            </nav>
          </div>
        </div>
      </div>

      {isActive && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0"
          onClick={handleToggle}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
