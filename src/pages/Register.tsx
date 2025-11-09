import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { authAPI } from "../services/api";
import { useSafeAsync } from "../hooks/useSafeAsync";
import {
  registerValidationSchema,
  type RegisterFormValues,
} from "../utils/validation";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { execute, loading, error, setError } = useSafeAsync({
    onError: (err) => {
      console.error("Register component error:", err);
    },
  });

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError(null);

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    await execute(
      async () => {
        const result = await authAPI.register(data);

        if (result.success && result.data) {
          localStorage.setItem("userId", result.data._id);
          navigate("/products");
        } else {
          throw new Error(
            result.error?.message || "Registration failed. Please try again."
          );
        }
      },
      // Success callback
      () => {
        console.log("Registration successful");
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
              <h2 className="card-title text-center mb-4">Register</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={registerValidationSchema}
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
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback d-block"
                      />
                    </div>
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
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback d-block"
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="d-flex align-items-center justify-content-center">
                            <span
                              className="spinner-border me-2"
                              role="status"
                              aria-hidden="true"
                              style={{ width: "1.5rem", height: "1.5rem" }}
                            ></span>
                            Registering...
                          </div>
                        ) : (
                          "Register"
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
