import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { checkTicketValid } from "../functions/checkTicketValid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 240,
    sm: 270,
    md: 370,
    lg: 420,
  },
  backgroundColor: "#f2f2f2",
  color: "#0d1b2a",
  border: "1px solid #20232a",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
const spanStyle = {
  fontSize: 20,
  color: "#8d99ae",
};
const ShowTicketModal = ({ data, handleClose }) => {
  const [validity, setValidity] = useState({});
  useEffect(() => {
    fetchValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function fetchValidity() {
    const validityRes = await checkTicketValid(data.t_id);
    setValidity(validityRes);
  }
  return (
    <Box sx={style}>
      <Typography>
        <span style={spanStyle}>Source :</span> {data.start_loc}
      </Typography>
      <Typography>
        <span style={spanStyle}>Destination :</span> {data.dest_loc}
      </Typography>
      <Typography>
        <span style={spanStyle}>Fare :</span> {data.t_fare}
      </Typography>
      <Typography>
        <span style={spanStyle}>Purchased at :</span> {data.t_time}
      </Typography>
      <Typography>
        <span style={spanStyle}>Expires at :</span> {data.t_expires}
      </Typography>
      {validity.success ? (
        <>
          {/* "#38b000" */}
          <Typography
            color={validity.ticket_is === "Valid" ? "#38b000" : "#d00000"}
          >
            <span style={spanStyle}>Ticket status :</span> {validity.ticket_is}
          </Typography>
          <Typography>
            <span style={spanStyle}>Ticket owner :</span> {validity.p_uname}
          </Typography>
        </>
      ) : (
        <Typography color="#d00000">
          <span style={spanStyle}>Ticket status :</span>
          {validity.msg}
        </Typography>
      )}
      <Button
        variant="outlined"
        color="error"
        onClick={() => handleClose()}
        sx={{ marginTop: 5 }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ShowTicketModal;
