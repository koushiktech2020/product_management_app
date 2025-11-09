import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { useSafeAsync } from "../hooks/useSafeAsync";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { execute, loading } = useSafeAsync({
    onError: (err) => {
      console.error("Navbar logout error:", err);
    },
  });

  useEffect(() => {
    const auth = !!localStorage.getItem("userId");
    setIsAuthenticated(auth);
  }, []);

  const handleLogout = async () => {
    await execute(
      async () => {
        const result = await authAPI.logout();

        // Always clear local state regardless of API result
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
        navigate("/");

        if (!result.success) {
          throw new Error(result.error?.message || "Logout failed");
        }
      },
      // Success callback
      () => {
        console.log("Logout successful");
      }
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={isAuthenticated ? "/products" : "/"}>
          Product Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
