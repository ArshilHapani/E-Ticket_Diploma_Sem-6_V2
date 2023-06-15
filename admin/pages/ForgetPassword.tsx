import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  Avatar,
  Modal,
  Box,
} from "@mui/material";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import isUserNameValid from "../functions/userNameValidate";
import UpdatePassword from "@/components/UpdatePasswordModal";
import Spinner from "@/components/Spinner";
import { sendOtp } from "@/functions/api/dataPosters";

const ForgotPassword = () => {
  const [textDisable, setTextDisable] = useState<boolean>(true);
  const [resetPasswordModal, setResetPasswordModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [otp, setOtp] = useState(0);
  const [initialOtp, setInitialOtp] = useState<number>(0);
  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: (value: { uname: string }) => sendOtp(value),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.msg);
        setTextDisable(false);
        setOtp(response.pin);
      } else {
        toast.error(response.msg);
        setTextDisable(false);
      }
    },
  });

  const handleClick = async () => {
    if (userName === "") {
      toast.error("please enter your username");
      return;
    }
    if (!isUserNameValid(userName)) {
      toast.error("Enter a valid username");
      return;
    }
    mutate({ uname: userName });
  };

  const handleOTPClick = () => {
    if (initialOtp === 0) {
      toast.error("Please enter OTP");
      return;
    }
    if (initialOtp.toString() === otp.toString()) {
      setResetPasswordModal(true);
    } else {
      toast.error("Invalid OTP");
      return;
    }
  };
  return (
    <>
      {isLoading && <Spinner message={`Sending mail to ${userName}`} />}
      <div className="form-root">
        <Stack
          sx={{
            width: {
              xs: "70vw",
              md: "45vw",
              lg: "35vw",
            },
            alignContent: "center",
            padding: "30px 1.5rem 0px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
            background: "#fff",
          }}
        >
          <Stack
            sx={{
              padding: "30px",
            }}
          >
            <Typography
              fontSize={{
                xs: 20,
                sm: 18,
                md: 25,
                xl: 30,
              }}
              fontWeight="600"
              sx={{
                color: "Blue",
                padding: "8px",
              }}
              textAlign="center"
            >
              Forgot Password??
            </Typography>
            <Typography
              fontSize={{
                xs: 12,
                sm: 13,
                md: 15,
                xl: 18,
              }}
              fontWeight="500"
              textAlign="center"
            >
              Enter your username address below and we'll send you password
              reset OTP on your email.{" "}
              {isError && `Error sending OTP '${error}'`}
            </Typography>
          </Stack>
          <Stack>
            <TextField
              className="textfield"
              label="Enter username"
              variant="standard"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Stack>
          <Stack
            direction="column"
            gap={2}
            sx={{
              paddingTop: "20px",
              paddingBottom: "15px",
            }}
          >
            <Button variant="outlined" onClick={handleClick}>
              Send Mail
            </Button>
            <TextField
              disabled={textDisable}
              label="Enter OTP"
              type="number"
              variant="standard"
              onChange={(e) => setInitialOtp(parseInt(e.target.value))}
            />
            <Button
              variant="outlined"
              onClick={handleOTPClick}
              disabled={textDisable}
              type="submit"
            >
              Verify OTP
            </Button>
            <Divider />
            <Stack
              sx={{
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              <Link
                href="/"
                style={{ textAlign: "center" }}
                className="link-styles-anchor-tags"
              >
                Already have an account?
              </Link>
              <Avatar
                alt="logo"
                src="/png/logo-no-background.png"
                sx={{ height: 60, width: 60, margin: "0.5rem 0" }}
              />
            </Stack>
          </Stack>
        </Stack>
      </div>

      {/* Change pwd model */}
      <Modal open={resetPasswordModal}>
        <Box>
          <UpdatePassword
            uname={userName}
            closingModal={setResetPasswordModal}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ForgotPassword;
