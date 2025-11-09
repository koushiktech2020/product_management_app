import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { authAPI } from "../services/api";
import { useSafeAsync } from "../hooks/useSafeAsync";
import {
  loginValidationSchema,
  type LoginFormValues,
} from "../utils/validation";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { execute, loading, error, setError } = useSafeAsync({
    onError: (err) => {
      console.error("Login component error:", err);
    },
  });

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError(null); // Clear previous errors

    await execute(
      async () => {
        const result = await authAPI.login(values);

        if (result.success && result.data) {
          localStorage.setItem("userId", result.data._id);
          navigate("/products");
        } else {
          throw new Error(
            result.error?.message || "Login failed. Please try again."
          );
        }
      },
      // Success callback
      () => {
        console.log("Login successful");
      }
    );

    setSubmitting(false);
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
                {() => (
                  <Form>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
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
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="d-flex align-items-center justify-content-center">
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                              style={{ width: "1.2rem", height: "1.2rem" }}
                            ></span>
                            Logging in...
                          </div>
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
