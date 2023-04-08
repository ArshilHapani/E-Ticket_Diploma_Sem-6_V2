import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./context/stateContext";
import "./index.css";
import { ErrorBoundary } from "./container/Error/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
