import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Avatar,
  // Avatar,
} from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useStateContext } from "../../context/stateContext";
import isUserNameValid from "../../functions/userNameValidate";
import validateEmail from "../../functions/validateEmail";
import logo from "../../assets/favicon.png";
import calculateAge from "../../functions/agrCalculate";

const NewUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackBar, setLoader } = useStateContext();
  const [user, setUser] = useState({
    uname: "",
    pwd: "",
    name: "",
    dob: "",
    no: "",
    email: location.state?.email ?? location.state?.email,
  });
  if (
    sessionStorage.getItem("sessionId") === undefined ||
    sessionStorage.getItem("sessionId") === null ||
    sessionStorage.getItem("sessionId") === ""
  ) {
    showSnackBar(
      "Please enter your credentials to continue or verify your email",
      "info"
    );
    navigate("/getStarted");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (calculateAge(user.dob) < 14 || calculateAge(user.dob) > 100) {
      showSnackBar("Your age must be between 14 to 100", "error");
      return;
    }
    if (
      user.uname === "" ||
      user.dob === "" ||
      user.email === "" ||
      user.pwd === "" ||
      user.name === ""
    ) {
      showSnackBar("Please enter all required fields", "error");
      return;
    }
    if (validateEmail(user.email) === null) {
      showSnackBar("please enter valid email format", "error");
      return;
    }
    if (user.pwd.length < 8) {
      showSnackBar(
        "The length of the password must be greater than or equal to 8",
        "error"
      );
      return;
    }
    if (user.no.length !== 0 && user.no.length < 10) {
      showSnackBar("Enter a valid mobile number", "error");
      return;
    }
    if (user.uname.length < 5) {
      showSnackBar(
        "The length of the username must be greater than or equal to 5",
        "error"
      );
      return;
    }
    if (!isUserNameValid(user.uname)) {
      showSnackBar("Enter a valid username", "error");
      return;
    }
    // Fetch...
    setLoader(true);
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND}/authentication/signUp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const response = await data.json();
    if (response.success) {
      showSnackBar(
        "Successfully created a new account! please sign in to continue",
        "success"
      );
      localStorage.setItem("user", response.authToken);
      navigate("/signIn");
    } else if (response.msg !== "") {
      showSnackBar(response.msg, "error");
    } else {
      showSnackBar("Something went wrong", "warning");
    }
    setLoader(false);
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form-root">
      <Stack
        sx={{
          width: {
            xs: "70vw",
            md: "40vw",
            lg: "35vw",
          },
          alignContent: "center",
          padding: "20px 1.5rem",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
          background: "#fff",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              padding: "30px",
            }}
          >
            <Stack justifyContent="center" alignItems="center">
              <Avatar src={logo} alt="logo" sx={{ height: 70, width: 70 }} />
            </Stack>
            <Typography
              fontSize={25}
              fontWeight="600"
              sx={{
                color: "Blue",
                padding: "8px",
              }}
              textAlign="center"
            >
              Sign Up
            </Typography>
            <Typography fontSize={15} fontWeight="500" textAlign="center">
              Enter your credential to continue
            </Typography>
          </Stack>
          <Divider />
          <Stack gap={1} direction="column">
            <TextField
              label="name*"
              variant="standard"
              value={user.name}
              onChange={(e) => {
                setUser({
                  ...user,
                  name: e.target.value,
                });
              }}
            />
            <TextField
              label="username*"
              variant="standard"
              onChange={(e) => {
                setUser({
                  ...user,
                  uname: e.target.value,
                });
              }}
            />
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password*
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setUser({
                    ...user,
                    pwd: e.target.value,
                  });
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              label="email*"
              variant="standard"
              type="text"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
            <TextField
              label="mobile number"
              variant="standard"
              type="number"
              onChange={(e) => {
                setUser({
                  ...user,
                  no: e.target.value,
                });
              }}
            />
            <TextField
              label="Date of Birth*"
              type="date"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                setUser({
                  ...user,
                  dob: e.target.value,
                });
              }}
            />

            <Stack
              sx={{
                paddingTop: "50px",
                paddingBottom: "15px",
              }}
            >
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
            </Stack>
            <Divider />
            <Stack
              sx={{
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
              justifyContent="flex-end"
              alignItems="center"
              direction="row"
            >
              <Link to="/signIn" className="link-styles-anchor-tags">
                Already have an account?
              </Link>
              {/* <Avatar
                alt="logo"
                src={logo}
                sx={{ height: 60, width: 60, margin: "0.5rem 0" }}
              /> */}
            </Stack>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default NewUser;
