import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../../public/Assets/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleLogout = () => {
    logout()
      .then(() => {
        if (user) {
          navigate(location?.state || "/");
          axiosCommon("/logout");
        }
      })
      .catch((error) => console.error(error.message));
  };

  const navOptions = (
    <>
      <li>
        <NavLink className="btn btn-outline text-white px-5" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="btn btn-outline text-white px-5"
          to="/allProperties"
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink className="btn btn-outline text-white px-5" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-50 bg-black text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <div className="flex items-center h-14 w-14">
            <img src={logo} alt="" />
            <a className="text-3xl">PropertyPros</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-5">
              <button
                onClick={handleLogout}
                className="btn btn-outline text-white px-5"
              >
                Log Out
              </button>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                data-tooltip-id="my-tooltip-1"
                style={{ backgroundColor: "#999" }}
              >
                <img
                  alt=""
                  className="w-10 rounded-full"
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/mXVJ4Qq/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDIz-LTAx-L3-Jt-Nj-A5-LXNvb-Glka-WNvbi13-LTAw-Mi1w-Ln-Bu.webp"
                  }
                />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-2 md:py-2 rounded-full text-md font-medium text-white">
                LogIn
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
