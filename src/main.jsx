import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Not from './Not.jsx'
import Createacc from "./Createacc.jsx"
import Buyer from "./Buyer.jsx";
import Seller from "./Seller.jsx";
import Jobseeker from "./Jobseeker.jsx";
import Skills from "./Skills";
import ServiceProviderSetup from "./ServiceProviderSetup";
import ListSpace from './listspace.jsx';
import SpaceDetails from "./SpaceDetails.jsx"
import Booking from "./Booking.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Not />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path:'/create',
    element:<Createacc />
  },
  {
    path:'/buyer',
    element:<Buyer />
  },
  {
    path:'/seller',
    element:<Seller />
  },
  {
    path:'/jobseeker',
    element:<Jobseeker />
  },
  {
    path:'/list-space',
    element: <ListSpace />
  },
  {
    path:"/jobseeker/skills",
    element: <Skills />
  },
  {
    path: "jobseeker/register-provider",
    element: <ServiceProviderSetup />
  },
  {
    path:"/space/:id",
    element:<SpaceDetails />
  },
  {
    path:"/book/:id",
    element:<Booking />
  }

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
);
