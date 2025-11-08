import React from "react";
import type { RouteObject } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";

const layoutElement = (children: React.ReactNode) => (
  <Layout>{children}</Layout>
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicRoute>{layoutElement(<Login />)}</PublicRoute>,
  },
  {
    path: "/register",
    element: <PublicRoute>{layoutElement(<Register />)}</PublicRoute>,
  },
  {
    path: "/products",
    element: <PrivateRoute>{layoutElement(<ProductList />)}</PrivateRoute>,
  },
];

export default routes;
