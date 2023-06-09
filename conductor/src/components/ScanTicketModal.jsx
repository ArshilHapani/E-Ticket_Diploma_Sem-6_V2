import { Button, Stack } from "@mui/material";
import React from "react";
import QrReader from "react-qr-reader";

const styleDef = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f2f2f2",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
const ScanTicketModal = ({
  setQrModel,
  setStartScan,
  setData,
  snackbarSetterFunction,
  setOpen,
}) => {
  const handleScan = async (scanData) => {
    if (scanData && scanData !== "") {
      try {
        //converting qr json data into js object
        if (
          typeof JSON.parse(scanData) === "object" &&
          JSON.parse(scanData).t_id
        ) {
          setData(JSON.parse(scanData));
          setOpen(true);
        } else if (JSON.parse(scanData).name) {
          snackbarSetterFunction(
            "Kindly scan this qr code via add recharge scanner",
            "info"
          );
        } else {
          snackbarSetterFunction("Invalid qr code", "error");
        }
        setStartScan(false);
      } catch (error) {
        //if data is string...
        snackbarSetterFunction("Something went wrong", "warning ");
      }
      //stopping the user's cam manually
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: false })
        .then((mediaStream) => {
          const stream = mediaStream;
          const tracks = stream.getTracks();
          tracks[0].stop();
        });
    }
  };
  const handleError = (err) => {
    snackbarSetterFunction(err, "warning");
    return;
  };
  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={styleDef}
      >
        <QrReader
          constraints={{
            facingMode: "environment",
          }}
          delay={1500}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "300px" }}
        />
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setQrModel(false);
            setStartScan(false);
          }}
          sx={{ marginTop: 5 }}
        >
          Close
        </Button>
      </Stack>
    </>
  );
};

export default ScanTicketModal;
