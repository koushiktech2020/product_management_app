import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center">
            {/* 404 Illustration */}
            <div className="mb-4">
              <div className="notfound-number">404</div>
            </div>

            {/* Error Message */}
            <h1 className="display-4 fw-bold text-muted mb-3">
              Page Not Found
            </h1>

            <p className="lead text-muted mb-4">
              Sorry, the page you're looking for doesn't exist. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
              <Link
                to="/"
                className="btn btn-primary btn-lg px-4 d-flex align-items-center gap-1"
              >
                <i className="bi bi-house-door"></i>
                Go Home
              </Link>

              <Link
                to="/products"
                className="btn btn-outline-primary btn-lg px-4 d-flex align-items-center gap-1"
              >
                <i className="bi bi-grid"></i>
                View Products
              </Link>
            </div>

            {/* Additional Help */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h4 className="card-title text-muted mb-2">
                  <i className="bi bi-lightbulb me-2"></i>
                  What you can do:
                </h4>
                <ul className="list-unstyled text-center mb-0">
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Go back to the homepage
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Check the URL for typos
                  </li>
                  <li className="mb-0">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Use the navigation menu
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
