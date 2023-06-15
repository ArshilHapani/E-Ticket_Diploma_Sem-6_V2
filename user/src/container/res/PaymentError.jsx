/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useStateContext } from "../../context/stateContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack } from "@mui/material";

const PaymentError = () => {
  const { showSnackBar, theme, setDebitCardRechargeAmount } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    showSnackBar("Payment is canceled", "error");
    navigate("/");
    setDebitCardRechargeAmount(0);
  }, []);

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

export default PaymentError;
