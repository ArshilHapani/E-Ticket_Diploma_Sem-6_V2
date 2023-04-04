import { Home } from "./container";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  EnterEmail,
  ForgotPassword,
  Loader,
  NewUser,
  OldUser,
  PurchaseTicketModel,
  SnackbarAlert,
} from "./components";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === undefined ||
      localStorage.getItem("user") === ""
    ) {
      navigate("/signIn");
    }
    if (location.pathname === "/signUp") {
      navigate("/signUp");
    }
    if (location.pathname === "/getStarted") {
      navigate("/getStarted");
    }
    if (location.pathname === "/forgetPassword") {
      navigate("/forgetPassword");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  return (
    <>
      <div className="main-parent">
        <Routes>
          <Route exact path="/*" element={<Home />} />
          <Route
            exact
            path="/signUp"
            element={
              <div style={{ overFlowX: "hidden" }}>
                {" "}
                <NewUser />
              </div>
            }
          />
          <Route
            exact
            path="/signIn"
            element={
              <div style={{ overFlowX: "hidden" }}>
                {" "}
                <OldUser />
              </div>
            }
          />
          <Route
            exact
            path="/getStarted"
            element={
              <div style={{ overFlowX: "hidden" }}>
                {" "}
                <EnterEmail />
              </div>
            }
          />
          <Route
            exact
            path="/forgetPassword"
            element={
              <div style={{ overFlowX: "hidden" }}>
                {" "}
                <ForgotPassword />
              </div>
            }
          />
        </Routes>
        <Loader />
        <SnackbarAlert />
        <PurchaseTicketModel />
      </div>
    </>
  );
}

export default App;
