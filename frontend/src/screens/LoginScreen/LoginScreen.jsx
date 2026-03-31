import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Container,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  ArrowBack,
} from "@mui/icons-material";
import { useAuthStore } from "../../store/useAuthStore";
import { styled } from "@mui/material/styles";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  [theme.breakpoints.up("md")]: {
    maxWidth: 1100,
    margin: "0 auto",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    transition: "all 0.3s ease",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.9rem",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: theme.spacing(1.5),
  padding: "12px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 4px 10px rgba(102, 126, 234, 0.3)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
    background: "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
  },
  "&:disabled": {
    background: "#cbd5e0",
    transform: "none",
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  "& .check-icon": {
    width: 28,
    height: 28,
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(1.5),
    fontSize: "0.8rem",
  },
}));

function LoginScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const initialValues = {
    emailOrPhone: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailOrPhone: Yup.string().required("Email or phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await login({
        email: values.emailOrPhone,
        password: values.password,
      });

      if (res) {
        Swal.fire({
          title: "Welcome Back!",
          text: "Login successful",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#fff",
          customClass: {
            popup: "rounded-2xl",
          },
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Access Denied",
          text: "Invalid Credentials",
          icon: "error",
          confirmButtonColor: "#667eea",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#667eea",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledPaper elevation={0}>
          <Grid container>
            {/* Left side - Welcome section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: "none", md: "block" },
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                p: 5,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                  Welcome Back to{" "}
                  <Box component="span" sx={{ fontWeight: 800 }}>
                    CarAuras
                  </Box>
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                  Drive your dream today with India's most trusted car
                  marketplace
                </Typography>

                <Box sx={{ mt: 4 }}>
                  <FeatureItem>
                    <Box className="check-icon">✓</Box>
                    <Typography variant="body2">
                      Access to 10,000+ verified cars
                    </Typography>
                  </FeatureItem>
                  <FeatureItem>
                    <Box className="check-icon">✓</Box>
                    <Typography variant="body2">
                      Best prices guaranteed
                    </Typography>
                  </FeatureItem>
                  <FeatureItem>
                    <Box className="check-icon">✓</Box>
                    <Typography variant="body2">
                      24/7 customer support
                    </Typography>
                  </FeatureItem>
                  <FeatureItem>
                    <Box className="check-icon">✓</Box>
                    <Typography variant="body2">
                      Free car inspection reports
                    </Typography>
                  </FeatureItem>
                </Box>

                <Box sx={{ mt: 5, pt: 3 }}>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Join 50,000+ happy customers
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Typography key={star} variant="h6">
                        ★
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Decorative elements */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.1)",
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: -30,
                  left: -30,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.1)",
                  zIndex: 1,
                }}
              />
            </Grid>

            {/* Right side - Login Form */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                {/* Back button for mobile */}
                {isMobile && (
                  <IconButton
                    onClick={() => navigate("/")}
                    sx={{ mb: 2, color: "#667eea" }}
                  >
                    <ArrowBack />
                  </IconButton>
                )}

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Sign In
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Welcome back! Please enter your credentials
                </Typography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    values,
                    isValid,
                  }) => (
                    <Form style={{ width: "100%" }} noValidate>
                      <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        id="emailOrPhone"
                        label="Email or Phone Number"
                        name="emailOrPhone"
                        autoComplete="email"
                        autoFocus
                        value={values.emailOrPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.emailOrPhone && Boolean(errors.emailOrPhone)
                        }
                        helperText={touched.emailOrPhone && errors.emailOrPhone}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: "#667eea" }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: "#667eea" }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <SubmitButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={
                          loading || !values.emailOrPhone || !values.password
                        }
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Sign In"
                        )}
                      </SubmitButton>

                      <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Link
                          to="/forgot-password"
                          style={{
                            textDecoration: "none",
                            color: "#667eea",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                          }}
                        >
                          Forgot password?
                        </Link>
                      </Box>

                      <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          Don't have an account?{" "}
                          <Link
                            to="/signup"
                            style={{
                              textDecoration: "none",
                              color: "#667eea",
                              fontWeight: 600,
                            }}
                          >
                            Sign Up
                          </Link>
                        </Typography>
                      </Box>

                      {!isMobile && (
                        <Box sx={{ mt: 4, textAlign: "center" }}>
                          <Link
                            to="/"
                            style={{
                              textDecoration: "none",
                              color: "#9ca3af",
                              fontSize: "0.875rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <ArrowBack sx={{ fontSize: "1rem" }} />
                            Back to Home
                          </Link>
                        </Box>
                      )}
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </Box>
  );
}

export default LoginScreen;
