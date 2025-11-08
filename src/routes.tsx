import type { RouteObject } from "react-router-dom";
import Layout from "./components/Layout";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <ProductList />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/products",
    element: (
      <Layout>
        <ProductList />
      </Layout>
    ),
  },
];

export default routes;
