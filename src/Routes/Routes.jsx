import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root.jsx";
import Home from "../Pages/Home/Home/Home.jsx";
import Login from "../Pages/Login/Login.jsx";
import Signup from "../Pages/Signup/Signup.jsx";
import ErrorPage from "../Layout/ErrorPage/ErrorPage";
import Details from "../Pages/Home/Advertisement/Details.jsx";
import PrivateRoute from "./PrivateRoutes.jsx";
import AllProperties from "../Pages/AllProperties/AllProperties/AllProperties.jsx";
import Dashboard from "../Layout/Dashboard/Dashboard.jsx";
import Wishlist from "../Components/DashboardItems/UserItems/Wishlist.jsx";
import MakeOfferForm from "../Components/DashboardItems/UserItems/MakeOfferForm.jsx";
import UserProfile from "../Components/DashboardItems/Profile/UserProfile/UserProfile.jsx";
import AddProperty from "../Components/DashboardItems/AgentItems/AddProperty.jsx";
import MyAddedProperties from "../Components/DashboardItems/AgentItems/MyAddedProperties.jsx";
import UpdatePropertyForm from "../Components/DashboardItems/AgentItems/UpdatePropertyForm.jsx";
import ManageProperties from "../Components/DashboardItems/AdminItems/ManageProperties.jsx";
import ManageUsers from "../Components/DashboardItems/AdminItems/ManageUsers.jsx";
import ManageRequest from "../Components/DashboardItems/AdminItems/ManageRequest.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <Signup></Signup>,
      },
      {
        path: "offer/:id",
        element: <MakeOfferForm></MakeOfferForm>,
      },
      {
        path: "/allProperties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://property-pros-server.vercel.app/Advertisement/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "wishlist",
        element: <Wishlist />,
      },

      {
        path: "userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "addProperty",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "updateProperty/:id",
        element: <UpdatePropertyForm></UpdatePropertyForm>,
      },
      {
        path: "myAddedProperties",
        element: <MyAddedProperties></MyAddedProperties>,
      },
      {
        path: "manageProperties",
        element: <ManageProperties></ManageProperties>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manageRequest",
        element: <ManageRequest></ManageRequest>,
      },
    ],
  },
]);
