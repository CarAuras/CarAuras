import React, { useState } from "react";
import "./ResetPassswordScreen.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IconButton, InputAdornment, InputBase } from "@mui/material";
import axios from "axios";
import { FOREGOT_PASSWORD_URL, RESET_PASSWORD_URL } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useParams } from "react-router-dom";

function ResetPassswordScreen() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const notify = () => toast.success("Successfully reset your password");

  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);

      const res = await axios.post(`${RESET_PASSWORD_URL}/${id}`, {
        newPassword: values.password,
      });
      if (res && res.status === 200) {
        notify();
        window.location.href = "/signin";
      } else {
        toast.error("Time expired , please try again");
      }
    } catch (error) {
      toast.error("User not found with this email");
    } finally {
      setLoading(false);
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div>
      <div className="login-screen">
        <div className="container p-4">
          <div className="row">
            <div className="col-md-6">
              <img
                src="/images/intro.png"
                className="w-100"
                alt="Login"
                title="reset password image"
              />
            </div>
            <div className="col-md-6">
              <h1 className="font-lg">
                Reset <span className="highlighted">Password</span>
              </h1>
              <p className="font-sm-2">
                The easiest and most convenient platform for buying and selling
                cars.
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {message && <div className="message-box">{message}</div>}

                    <div className="mt-3">
                      <p className="font-sm">New Password</p>
                      <Field
                        as={InputBase}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="New Password"
                        className="search-input-2"
                        style={{
                          border: "1px solid grey",
                          padding: "15px",
                          width: "100%",
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-text"
                      />
                    </div>

                    <div className="mt-3">
                      <p className="font-sm">Confirm Password</p>
                      <Field
                        as={InputBase}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        placeholder="Confirm Password"
                        className="search-input-2"
                        style={{
                          border: "1px solid grey",
                          padding: "15px",
                          width: "100%",
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <ErrorMessage
                        name="confirm_password"
                        component="div"
                        className="error-text"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-100 highlighted-btn mt-5"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? "Processing..." : "Reset Password"}
                    </button>
                  </Form>
                )}
              </Formik>
              <div className="mt-3">
                <a href="/forgot-password" className="link">
                  Sent reset link again
                </a>
              </div>
              <div className="mt-4">
                <a href="/signup" className="link">
                  Don't have an account? Sign Up
                </a>
              </div>

              <a href="/signin" className="link">
                Already have an account?
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassswordScreen;
