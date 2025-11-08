import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  loginValidationSchema,
  type LoginFormValues,
} from "../utils/validation";

const Login: React.FC = () => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    {
      setSubmitting,
      setStatus,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setStatus: (status: string) => void;
    }
  ) => {
    try {
      console.log("Login attempt:", values);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      setStatus("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, status }) => (
                  <Form>
                    {status && (
                      <div className="alert alert-danger" role="alert">
                        {status}
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback d-block"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback d-block"
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-3">
                <Link to="/register" className="text-decoration-none">
                  Don't have an account? Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
