/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useStateContext } from "../../context/stateContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Stack } from "@mui/material";
import { decrypt } from "../../functions";

const PaymentSuccess = () => {
  const { setLoader, showSnackBar, theme } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    sendRechargeToUser();
  }, []);
  async function sendRechargeToUser() {
    let amount = await decrypt(
      localStorage.getItem("bc2e8a6580dff48c99674fcabe9366d5230203b7")
    );
    if (parseInt(id) !== parseInt(amount)) {
      showSnackBar(
        "Failed to authenticate payment as you tried to modify the amount",
        "error"
      );
      localStorage.removeItem("bc2e8a6580dff48c99674fcabe9366d5230203b7");
      navigate("/");
      return;
    }
    setLoader(true);
    const rechargeToUser = await fetch(
      `${process.env.REACT_APP_BACKEND}/passenger/recharge`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("user").toString(),
        },
        body: JSON.stringify({
          amount,
        }),
      }
    );
    const res = await rechargeToUser.json();
    console.log(res);
    if (res.success) {
      showSnackBar(
        `Recharged of ${amount} is successfully debited to your account`,
        "success"
      );
      localStorage.removeItem("bc2e8a6580dff48c99674fcabe9366d5230203b7");
      navigate("/");
    } else {
      showSnackBar(
        "Failed to add recharge to your account please contact with administrator to fix this issue",
        "error"
      );
      localStorage.removeItem("bc2e8a6580dff48c99674fcabe9366d5230203b7");
      navigate("/");
    }
    setLoader(false);
  }
  return (
    <Stack
      sx={{
        bgcolor: theme === "dark" ? "#20232a" : "#f1f5f9",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Container>
        <Button onClick={() => navigate("/")}>Back to home page</Button>
      </Container>
    </Stack>
  );
};

export default PaymentSuccess;
