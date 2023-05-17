import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/stateContext";
import { ErrorBoundary } from "./container/Error/ErrorBoundary";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </Elements>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
