import React from "react";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
