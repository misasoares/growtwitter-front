import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>NOT FOUND</h1>,
  },
  {
    path:'/login',
    element: <Login/>,
    errorElement: <h1>NOT FOUND</h1>
  }

]);

const RoutesApp: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RoutesApp;
