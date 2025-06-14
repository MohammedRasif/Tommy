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

const router = createBrowserRouter([
  {
    path: "/",
    element:<Roots/> ,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element:<Home/> ,
      },
      {
        path:"/business_Partner",
        element:<BusinessPartner/>
      }
    ],
  },


  {
    path:"/dashboard",
    element:<UserDashboardLayout/>,
    children:[
      {
        index:true,
        element:<Dashboard/>,
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
