import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputBase } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { FOREGOT_PASSWORD_URL } from "../../config/api";
import "./ForegotPasswordScreen.css";

function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${FOREGOT_PASSWORD_URL}`, values);
      setLoading(false);

      if (res && res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Password reset link sent to your email",
          icon: "success",
        }).then(() => {
          navigate("/signin");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "User not found with this email",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "User not found with this email",
        icon: "error",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-left">
          <img
            src="/images/intro.png"
            className="login-image"
            alt="Login"
            title="forgot password page image"
          />
        </div>
        <div className="login-right">
          <div className="login-header">
            <h1 className="login-title">
              Forgot <span className="highlighted">Password?</span>
            </h1>
            <p className="login-subtitle">
              The easiest and most convenient platform for buying and selling
              cars.
            </p>
          </div>

          {message && <div className="message-box">{message}</div>}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="login-form">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <Field
                    as={InputBase}
                    name="email"
                    placeholder="Enter your email"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-text"
                  />
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="login-footer">
            <a href="/" className="login-link">
              Back to Home? <span>CarAuras</span>
            </a>
            <a href="/signup" className="login-link">
              Don't have an account? <span>Sign Up</span>
            </a>
            <a href="/signin" className="login-link">
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
