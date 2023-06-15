"use client";

import { SyntheticEvent, useState } from "react";
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
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import { signInAdmin } from "@/functions/api/dataPosters";

const SignIn = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    uname: "",
    password: "",
  });
  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: (value: { uname: string; password: string }) =>
      signInAdmin(value),
    onSuccess: (response) => {
      if (response.success) {
        sessionStorage.setItem("admin", response.authToken);
        toast.success("Welcome to admin panel!");
        router.push("/HomePage");
      } else if (!response.success) {
        toast.error(response.msg);
      }
    },
  });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (user.uname === "" || user.password === "") {
      toast.error("Please enter your username and password");
      return;
    }
    mutate(user);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <div className="form-root">
      {isLoading && <Spinner message={`Verifying ${user?.uname} `} />}

      <Stack
        sx={{
          width: {
            xs: "70vw",
            md: "40vw",
            lg: "30vw",
          },
          alignItems: "center",
          padding: "30px 1rem",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={2}>
            <Stack
              sx={{
                padding: "30px",
              }}
            >
              <Typography
                fontSize={25}
                fontWeight="600"
                sx={{
                  color: "Blue",
                  padding: "8px",
                }}
                textAlign="center"
              >
                Hi, Welcome
              </Typography>
              <Typography fontSize={15} fontWeight="500" textAlign="center">
                Enter your credential to continue
              </Typography>
              {isError && `Error while signing in '${error}'`}
            </Stack>
            <Stack gap={1}>
              <TextField
                className="textfield"
                label="username"
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
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
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
            </Stack>
            <Stack
              direction="column"
              gap={2}
              sx={{
                paddingTop: "20px",
                paddingBottom: "15px",
              }}
            >
              <Link
                href="/ForgetPassword"
                className="link-styles-anchor-tags"
                // @ts-ignore
                align="right"
              >
                <Typography> Forgot Password?</Typography>
              </Link>
              <Button variant="outlined" type="submit">
                Sign In
              </Button>
            </Stack>
            <Divider />
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default SignIn;
