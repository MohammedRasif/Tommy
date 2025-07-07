import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Roots from "./Root/Roots.jsx";
import ErrorPage from "./component/ErrorPage/ErrorPage.jsx";
import Home from "./component/Home/Home.jsx";
import UserDashboardLayout from "./component/UserDashboard/UserDashboardLayout/UserDashboardLayout.jsx";
import Dashboard from "./component/UserDashboard/UserDashboardPages/Dashboard.jsx";
import BusinessPartner from "./component/Pages/BusinessPartner.jsx";
import BusinessFilter from "./component/Pages/BusinessFilter.jsx";
import CompanyDetails from "./component/UserDashboard/UserDashboardPages/CompanyDetails.jsx";
import CompanyList from "./component/UserDashboard/UserDashboardPages/CompanyList.jsx";
import ContactList from "./component/UserDashboard/UserDashboardPages/ContactList.jsx";
import MemberShip from "./component/UserDashboard/UserDashboardPages/MemberShip.jsx";
import Profile from "./component/UserDashboard/UserDashboardPages/Profile.jsx";
import EditProfile from "./component/UserDashboard/UserDashboardPages/EditProfile.jsx";
import Login from "./component/Pages/Login.jsx";
import Register from "./component/Pages/Register.jsx";
import ForgetPassword from "./component/Pages/ForgetPassword.jsx";
import RegisterVerication from "./component/Pages/registerVerication.jsx";
import ForgetPasswordVerification from "./component/Pages/ForgetPasswordVerification.jsx";
import ChangePassword from "./component/Pages/ChangePassword.jsx";
import SuccessfullyMessage from "./component/Pages/SuccessfullyMessage.jsx";
import AiGenerator from "./component/UserDashboard/UserDashboardPages/AiGenerator.jsx";
import Contact from "./component/UserDashboard/UserDashboardPages/Contact.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
// import AiGenerator from "./component/UserDashboard/UserDashboardPages/AiGenerator.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/business_partner",
        element: <BusinessPartner />,
      },
      {
        path: "/business_filter",
        element: <BusinessFilter />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register_verification",
    element: <RegisterVerication />,
  },
  {
    path: "/forgetPassword_verification",
    element: <ForgetPasswordVerification />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/change_password",
    element: <ChangePassword />,
  },
  {
    path: "/successfully",
    element: <SuccessfullyMessage />,
  },
  {
    path: "/dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "company_details",
        element: <CompanyDetails />,
      },
      {
        path: "company_list",
        element: <CompanyList />,
      },
      {
        path: "contact_list",
        element: <ContactList />,
      },
      {
        path: "membership",
        element: <MemberShip />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "edit_profile",
        element: <EditProfile />,
      },
      {
        path: "ai_generator",
        element: <AiGenerator />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </StrictMode>
);
