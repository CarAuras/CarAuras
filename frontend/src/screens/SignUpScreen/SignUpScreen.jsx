import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  IconButton,
  InputBase,
  Switch,
  FormControlLabel,
  InputAdornment,
  CircularProgress,
  Paper,
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { districtsInKerala } from "../../dummyData/discticts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SIGN_UP_URL } from "../../config/api";
import axios from "axios";
import ComboBox from "../../components/ComboBox/ComboBox";
import { styled } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";

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

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  padding: "12px 16px",
  fontSize: "0.95rem",
  borderRadius: theme.spacing(1),
  border: "1px solid #e0e0e0",
  transition: "all 0.3s ease",
  backgroundColor: "#fff",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
}));

const SubmitButton = styled("button")(({ theme }) => ({
  width: "100%",
  padding: "12px",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#fff",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  border: "none",
  borderRadius: theme.spacing(1),
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
  },
}));

const FieldContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ErrorText = styled("div")(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.7rem",
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(1.5),
}));

function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [hasPhysicalStore, setHasPhysicalStore] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    email: "",
    business_name: "",
    location: "",
    has_physical_store: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .required("Username is required"),
    first_name: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    last_name: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    business_name: hasPhysicalStore
      ? Yup.string().required("Business name is required")
      : Yup.string(),
    location: Yup.string().required("Location is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${SIGN_UP_URL}`, values);
      if (res && res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Successfully created account",
          icon: "success",
          confirmButtonColor: "#667eea",
          timer: 2000,
        }).then(() => {
          navigate("/signin");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again",
          icon: "error",
          confirmButtonColor: "#667eea",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Unable to process request",
        icon: "error",
        confirmButtonColor: "#667eea",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (
    name,
    label,
    placeholder,
    icon,
    type = "text",
    xs = 12,
    sm = 6
  ) => (
    <Grid item xs={xs} sm={sm}>
      <FieldContainer>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          {icon}
          <Typography
            component="label"
            htmlFor={name}
            sx={{
              ml: 1,
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            {label}
          </Typography>
        </Box>
        <Field
          as={StyledInput}
          name={name}
          placeholder={placeholder}
          type={type}
          endAdornment={
            type === "password" && (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  sx={{ mr: 1, padding: 0 }}
                  size="small"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }
        />
        <ErrorMessage name={name} component={ErrorText} />
      </FieldContainer>
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 3,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledPaper elevation={0}>
          <Grid container>
            {/* Left side - Image and info */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: { xs: "none", md: "block" },
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                p: 4,
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
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Welcome to{" "}
                  <Box component="span" sx={{ fontWeight: 800 }}>
                    CarAuras
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  The easiest and most convenient platform for buying and
                  selling cars
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      ✓
                    </Box>
                    <Typography variant="body2">
                      Hassle-free car buying experience
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      ✓
                    </Box>
                    <Typography variant="body2">
                      Verified sellers and listings
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      ✓
                    </Box>
                    <Typography variant="body2">
                      Secure and safe transactions
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: -50,
                  right: -50,
                  width: 150,
                  height: 150,
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
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.1)",
                  zIndex: 1,
                }}
              />
            </Grid>

            {/* Right side - Form */}
            <Grid item xs={12} md={7}>
              <Box sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Create Account
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Join our community of car enthusiasts today
                </Typography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue, isValid }) => (
                    <Form>
                      <Grid container spacing={2}>
                        {/* 2-column layout for form fields */}
                        {renderField(
                          "first_name",
                          "First Name",
                          "Enter first name",
                          <PersonIcon fontSize="small" color="primary" />,
                          "text",
                          12,
                          6
                        )}
                        {renderField(
                          "last_name",
                          "Last Name",
                          "Enter last name",
                          <BadgeIcon fontSize="small" color="primary" />,
                          "text",
                          12,
                          6
                        )}
                        {renderField(
                          "email",
                          "Email Address",
                          "Enter email",
                          <EmailIcon fontSize="small" color="primary" />,
                          "text",
                          12,
                          12
                        )}
                        {renderField(
                          "username",
                          "Username",
                          "Choose username",
                          <PersonIcon fontSize="small" color="primary" />,
                          "text",
                          12,
                          6
                        )}
                        {renderField(
                          "phone",
                          "Phone Number",
                          "10-digit number",
                          <PhoneIcon fontSize="small" color="primary" />,
                          "text",
                          12,
                          6
                        )}

                        {/* Location field - full width */}
                        <Grid item xs={12}>
                          <FieldContainer>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <LocationOnIcon
                                fontSize="small"
                                color="primary"
                              />
                              <Typography
                                component="label"
                                sx={{
                                  ml: 1,
                                  fontSize: "0.8rem",
                                  fontWeight: 500,
                                }}
                              >
                                Location
                              </Typography>
                            </Box>
                            <ComboBox
                              options={districtsInKerala}
                              value={values.location || ""}
                              onChange={(e, newValue) =>
                                setFieldValue("location", newValue)
                              }
                              placeholder="Select your district"
                              sx={{
                                width: "100%",
                                "& .MuiInputBase-root": {
                                  padding: "8px 12px",
                                  fontSize: "0.95rem",
                                },
                              }}
                            />
                            <ErrorMessage
                              name="location"
                              component={ErrorText}
                            />
                          </FieldContainer>
                        </Grid>

                        {/* Password field */}
                        <Grid item xs={12}>
                          <FieldContainer>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <LockIcon fontSize="small" color="primary" />
                              <Typography
                                component="label"
                                sx={{
                                  ml: 1,
                                  fontSize: "0.8rem",
                                  fontWeight: 500,
                                }}
                              >
                                Password
                              </Typography>
                            </Box>
                            <Field
                              as={StyledInput}
                              name="password"
                              placeholder="Create a strong password"
                              type={showPassword ? "text" : "password"}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                    sx={{ mr: 1, padding: 0 }}
                                    size="small"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff fontSize="small" />
                                    ) : (
                                      <Visibility fontSize="small" />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            <ErrorMessage
                              name="password"
                              component={ErrorText}
                            />
                          </FieldContainer>
                        </Grid>

                        {/* Physical store switch */}
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={hasPhysicalStore}
                                onChange={() => {
                                  setHasPhysicalStore(!hasPhysicalStore);
                                  setFieldValue(
                                    "has_physical_store",
                                    !hasPhysicalStore
                                  );
                                }}
                                size="small"
                                sx={{
                                  "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#667eea",
                                  },
                                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                    {
                                      backgroundColor: "#667eea",
                                    },
                                }}
                              />
                            }
                            label={
                              <Typography variant="body2">
                                I have a physical store
                              </Typography>
                            }
                          />
                        </Grid>

                        {/* Business name field - conditional */}
                        {hasPhysicalStore && (
                          <Grid item xs={12}>
                            <FieldContainer>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 0.5,
                                }}
                              >
                                <BusinessIcon
                                  fontSize="small"
                                  color="primary"
                                />
                                <Typography
                                  component="label"
                                  sx={{
                                    ml: 1,
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                  }}
                                >
                                  Business Name
                                </Typography>
                              </Box>
                              <Field
                                as={StyledInput}
                                name="business_name"
                                placeholder="Enter your business name"
                              />
                              <ErrorMessage
                                name="business_name"
                                component={ErrorText}
                              />
                            </FieldContainer>
                          </Grid>
                        )}

                        {/* Submit button */}
                        <Grid item xs={12}>
                          <SubmitButton
                            type="submit"
                            disabled={loading || !isValid}
                          >
                            {loading ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              "Create Account"
                            )}
                          </SubmitButton>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          OR
                        </Typography>
                      </Divider>

                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          Already have an account?{" "}
                          <Box
                            component="a"
                            href="/signin"
                            sx={{
                              color: "#667eea",
                              textDecoration: "none",
                              fontWeight: 600,
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            Sign In
                          </Box>
                        </Typography>
                        <Box mt={1}>
                          <Typography variant="caption" color="text.secondary">
                            <Box
                              component="a"
                              href="/forgot-password"
                              sx={{
                                color: "text.secondary",
                                textDecoration: "none",
                                "&:hover": { color: "#667eea" },
                              }}
                            >
                              Forgot Password?
                            </Box>
                          </Typography>
                        </Box>
                      </Box>
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

export default SignUpScreen;
