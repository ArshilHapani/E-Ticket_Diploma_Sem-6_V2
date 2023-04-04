import { Box, Typography } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/stateContext";
import "./RecentTickets.scss";
const RecentTickets = () => {
  const navigate = useNavigate();
  if (
    localStorage.getItem("user") === null ||
    localStorage.getItem("user") === undefined ||
    localStorage.getItem("user") === ""
  ) {
    navigate("/signUp");
  }
  const { theme, toggleSync, setLoader } = useStateContext();
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    fetchRecentTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleSync]);

  async function fetchRecentTickets() {
    setLoader(true);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/passenger/ticket/3`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("user"),
        },
      }
    );
    const tick = await response.json();
    if (tick.success) {
      setTickets(tick.tickets);
    }
    setLoader(false);
  }
  return (
    <Box
      className={`recent-ticket-container ${
        theme === "light" ? "light" : "dark"
      }`}
    >
      <Typography
        sx={{
          fontSize: 24,
        }}
      >
        Recent Tickets
      </Typography>
      <Suspense fallback="loading">
        <Typography>
          {" "}
          {tickets?.length === 0 &&
            "Looks like you don't have ticket records.."}
        </Typography>
      </Suspense>
      {tickets?.length !== 0 &&
        tickets.map((item, index) => (
          <div
            className={`recent-ticket-details ${
              theme === "light" ? "light" : "dark"
            }`}
            key={index + item.time + item.t_id}
          >
            <h4>
              Starting point : <span>{item.start_loc}</span>
            </h4>
            <h4>
              Destination : <span>{item.dest_loc}</span>
            </h4>
            <div className="right">
              <h4>
                Fare :<span> {item.t_fare} &#8377;</span>
              </h4>
              <h4>
                Time : <span> {item.t_time}</span>
              </h4>
            </div>
          </div>
        ))}
    </Box>
  );
};

export default RecentTickets;
