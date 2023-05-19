import express, { json } from "express";
import cors from "cors";
import con from "./database.js"; // Connection object to establish connection with database
import * as dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const app = express();
const port = 6565;

import authentication from "./routes/authenticationRoutes.js";
import passenger from "./routes/passengerRoutes.js";
import conductor from "./routes/conductorRoutes.js";
import admin from "./routes/adminRoutes.js";

con.connect((error) => {
  // Connecting to database
  if (error) {
    throw error;
  } else {
    console.log("connected");
  }
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to backend");
});
app.use(json({ limit: "20mb" })); // Setting limit of data upto 20 mb

const stripeApiKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeApiKey);

app.use("/authentication", authentication);
app.use("/passenger", passenger);
app.use("/conductor", conductor);
app.use("/admin", admin);

app.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: "E-Ticket Recharge",
            description: "Recharge to your E-Ticket wallet using card",
            images: [
              "https://images.unsplash.com/photo-1609429019995-8c40f49535a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBheW1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
              "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBheW1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
              "https://images.unsplash.com/photo-1628625194933-ac2b3c0109e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHBheW1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
            ],
          },
          unit_amount: amount * 100, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URI}/paymentSuccess/${amount}`,
    cancel_url: `${process.env.FRONTEND_URI}/PaymentError`,
  });

  res.json({ id: session.id });
});

app.listen(port, () => {
  console.log("App listining at http://localhost:" + port);
});
