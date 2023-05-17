import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { MdOutlinePayments } from "react-icons/md";
import { useStateContext } from "../../context/stateContext";
import { loadStripe } from "@stripe/stripe-js";
import { encrypt } from "../../functions";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentModal = () => {
  const {
    setLoader,
    showSnackBar,
    setDebitCardRechargeAmount,
    debitCardRechargeAmount,
  } = useStateContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const stripe = await stripePromise;
    if (debitCardRechargeAmount === 0 || debitCardRechargeAmount === "") {
      showSnackBar("please enter amount", "error");
      setLoader(false);
      return;
    }
    if (debitCardRechargeAmount > 500 || debitCardRechargeAmount < 50) {
      showSnackBar("Recharging amount should be between 50 - 500", "error");
      setLoader(false);
      return;
    }
    localStorage.setItem(
      "bc2e8a6580dff48c99674fcabe9366d5230203b7",
      await encrypt(debitCardRechargeAmount)
    );
    // Call your server to create a new Checkout Session
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: debitCardRechargeAmount }),
      }
    );

    const session = await response.json();
    // Redirect to Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
    setLoader(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography
        style={{
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: 700,
          marginBottom: "20px",
        }}
      >
        Recharge
      </Typography>
      <Stack direction="column" justifyContent="center" gap={4}>
        <TextField
          label="Enter amount to rechage"
          type="number"
          placeholder="Amount to recharge"
          variant="standard"
          value={debitCardRechargeAmount ? debitCardRechargeAmount : ""}
          onChange={(e) => setDebitCardRechargeAmount(e.target.value)}
        />

        <Button
          endIcon={<MdOutlinePayments />}
          variant="contained"
          color="success"
          style={{ width: "100%" }}
          type="submit"
        >
          Pay
        </Button>
      </Stack>
    </form>
  );
};

export default PaymentModal;
