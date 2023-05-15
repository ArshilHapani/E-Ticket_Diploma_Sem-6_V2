import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { MdOutlinePayments } from "react-icons/md";
import StripeCheckout from "react-stripe-checkout";

const PaymentModal = () => {
  const [amount, setAmount] = useState(0);
  async function handleToken(token, address) {}
  return (
    <form>
      <Typography
        style={{ fontSize: "2rem", textAlign: "center", fontWeight: 700 }}
      >
        Recharge
      </Typography>
      <Stack direction="column" justifyContent="center" gap={4}>
        <TextField
          label="Enter amount to rechage"
          type="number"
          placeholder="Amount to recharge"
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          endIcon={<MdOutlinePayments />}
          variant="contained"
          color="success"
        >
          Pay
        </Button>
        <StripeCheckout
          stripeKey="pk_test_51MTnY9SJHjRbuahLrQha2Q7G8RA4IVirbhBs12iPzucbHyvIZr9p490hEMFO4BmvegO9iGj1tujcDjG6jYZ0MgZL00r1UfSZa0"
          name="Pay"
          billingAddress
          shippingAddress
          token={handleToken}
        />
      </Stack>
    </form>
  );
};

export default PaymentModal;
