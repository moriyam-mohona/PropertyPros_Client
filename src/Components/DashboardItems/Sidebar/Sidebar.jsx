import { useState } from "react";
import { Link } from "react-router-dom";
import UserMenu from "../Menu/UserMenu";
import AgentMenu from "../Menu/AgentMenu";
import AdminMenu from "../Menu/AdminMenu";
import useRole from "../../../Hooks/useRole";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Toggle button for mobile view */}
      <button
        className="md:hidden p-2 m-2 text-gray-700"
        onClick={handleToggle}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isActive ? "block" : "hidden"
        } md:block fixed md:relative z-10 bg-gray-100 w-64 px-2 py-4 my-20 md:my-0 h-full`}
      >
        <div>
          <div className="w-full flex shadow-lg rounded-lg justify-center items-center mx-auto mb-4">
            <Link to="/" onClick={handleToggle}>
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
              <UserMenu onClick={handleToggle}></UserMenu>
              {role === "agent" && (
                <AgentMenu onClick={handleToggle}></AgentMenu>
              )}
              {role === "admin" && (
                <AdminMenu onClick={handleToggle}></AdminMenu>
              )}
            </nav>
          </div>
        </div>
      </div>

      {isActive && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          onClick={handleToggle}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
