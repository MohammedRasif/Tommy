import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Roots from './Root/Roots.jsx';
import ErrorPage from './component/ErrorPage/ErrorPage.jsx';
import Home from './component/Home/Home.jsx';
import UserDashboardLayout from './component/UserDashboard/UserDashboardLayout/UserDashboardLayout.jsx';
import Dashboard from './component/UserDashboard/UserDashboardPages/Dashboard.jsx';
import BusinessPartner from './component/Pages/BusinessPartner.jsx';
import BusinessFilter from './component/Pages/BusinessFilter.jsx';
import CompanyDetails from './component/UserDashboard/UserDashboardPages/CompanyDetails.jsx';
import CompanyList from './component/UserDashboard/UserDashboardPages/CompanyList.jsx';
import ContactList from './component/UserDashboard/UserDashboardPages/ContactList.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Roots/> ,
    // errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element:<Home/> ,
      },
      {
        path:"/business_Partner",
        element:<BusinessPartner/>
      },
      {
        path:"/business_filter",
        element:<BusinessFilter/>
      },
    ],
  },


  {
    path:"/dashboard",
    element:<UserDashboardLayout/>,
    children:[
      {
        index:true,
        element:<Dashboard/>,
      },
      {
        path:"company_details",
        element:<CompanyDetails/>
      },
      {
        path:"company_list",
        element:<CompanyList/>
      },
      {
        path:"contact_list",
        element:<ContactList/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </StrictMode>,
)
