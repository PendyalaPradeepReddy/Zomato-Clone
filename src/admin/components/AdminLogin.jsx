import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AdminLogin() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (formInputValue.email === "" || formInputValue.password === "") {
      toast.warn("Email and password cannot be empty.");
      return;
    }
    if (
      formInputValue.email === "admin@gmail.com" &&
      formInputValue.password === "Admin@123"
    ) {
      toast.success(
        "Authorized Login. But we are still working on the next step."
      );
      navigate("/home");
    } else {
      toast.warn("You are not authorized or the token is invalid.");
    }
  };

  const handleonChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }

    setFormInputValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box
          display="flex"
          width="100%"
          height="100vh"
          flexDirection={isMobile ? "column" : "row"}
        >
          {/* Left side login form */}
          <Box
            maxWidth={isMobile ? "100%" : "40%"}
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={4}
          >
            <form onSubmit={handleLogin}>
              <Typography variant="h4" gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body1">Please sign to continue</Typography>
              {/* <img
                src="/images/undraw_Login.png"
                alt="Login Undraw"
                style={{
                  width: "40%",
                  height: "auto",
                }}
              /> */}
              <TextField
                label="Email Address"
                type="email"
                name="email"
                variant="outlined"
                margin="normal"
                fullWidth
                value={formInputValue.email}
                onChange={handleonChange}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={formInputValue.password}
                onChange={handleonChange}
              />
              <Box
                flex={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link style={{ color: "blue" }}>Forgot Password</Link>
              </Box>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
              >
                Login
              </Button>
              <Typography
                variant="body1"
                color="error"
                align="center"
                marginTop={2}
              >
                <i> Admin access only.</i>
              </Typography>
            </form>
          </Box>
          {/* right side images */}
          {!isMobile && (
            <Box
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src="/images/undraw_Metrics.png"
                alt="Login lllustrations"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          )}
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}

export default AdminLogin;
