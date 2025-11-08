import React from "react";
import type { RouteObject } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";

const layoutElement = (children: React.ReactNode) => (
  <Layout>{children}</Layout>
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: layoutElement(<Login />),
  },
  {
    path: "/register",
    element: layoutElement(<Register />),
  },
  {
    path: "/products",
    element: layoutElement(<ProductList />),
  },
];

export default routes;
