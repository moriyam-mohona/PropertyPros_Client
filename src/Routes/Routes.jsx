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
          fetch(`http://localhost:5000/Advertisement/${params.id}`),
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
        path: "offer/:id",
        element: <MakeOfferForm></MakeOfferForm>,
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
        path: "myAddedProperties",
        element: <MyAddedProperties></MyAddedProperties>,
      },
    ],
  },
]);
