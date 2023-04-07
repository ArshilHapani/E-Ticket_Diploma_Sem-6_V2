import { Button, Modal } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import {
  MdOutlineAttachMoney,
  MdOutlineHistory,
  MdQrCodeScanner,
} from "react-icons/md";
import { useStateContext } from "../context/stateContext";
import AddRechargeQrModel from "./AddRechargeQrModel";
import { Link } from "react-router-dom";
import ScanTicketModal from "./ScanTicketModal";
import ShowTicketModal from "./ShowTicketModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#f2f2f2",
  color: "#0d1b2a",
  border: "1px solid #20232a",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const Home = () => {
  document.title = "E-Ticket | Conductor - Scan";
  const { snackbarSetterFunction } = useStateContext();
  const [qrModel, setQrModel] = useState(false);
  const [startScan, setStartScan] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [rechargeModel, setRechargeModel] = useState(false);

  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (startScan)
      navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  }, [startScan]);

  return (
    <Stack
      sx={{
        backgroundColor: "#f2f2f2",
      }}
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        gap={3}
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          sx={{
            width: { sm: "24em", md: "20rem", lg: "23rem", xs: "22rem" },
            height: { sm: "10rem", md: "20rem", lg: "23rem", xs: "9rem" },
          }}
          color={startScan ? "error" : "success"}
          variant="contained"
          onClick={() => {
            setQrModel(true);
            setStartScan(true);
          }}
          endIcon={<MdQrCodeScanner />}
        >
          {startScan ? "Stop Scanning" : "Scan ticket"}{" "}
        </Button>
        <Button
          sx={{
            width: { sm: "24em", md: "20rem", lg: "23rem", xs: "22rem" },
            height: { sm: "10rem", md: "20rem", lg: "23rem", xs: "9rem" },
          }}
          endIcon={<MdOutlineAttachMoney />}
          variant="contained"
          color="secondary"
          onClick={() => {
            setRechargeModel(true);
          }}
        >
          Add Recharge{" "}
        </Button>
        <Link to="/transactions" className="link-styles-anchor-tags">
          <Button
            sx={{
              width: { sm: "24em", md: "20rem", lg: "23rem", xs: "22rem" },
              height: { sm: "10rem", md: "20rem", lg: "23rem", xs: "9rem" },
            }}
            variant="contained"
            color="primary"
            endIcon={<MdOutlineHistory />}
          >
            Transaction History{" "}
          </Button>
        </Link>
        {/* Scan qr code modal */}
        {startScan && (
          <Modal
            open={qrModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <ScanTicketModal
                setData={setData}
                snackbarSetterFunction={snackbarSetterFunction}
                setOpen={setOpen}
                setQrModel={setQrModel}
                setStartScan={setStartScan}
              />
            </>
          </Modal>
        )}
        {data !== "" && (
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              {data && (
                <ShowTicketModal data={data} handleClose={handleClose} />
              )}
            </>
          </Modal>
        )}
        {/* Recharge Qr Scan */}
        <Modal open={rechargeModel} onClose={() => setRechargeModel(false)}>
          <Stack
            sx={style}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <AddRechargeQrModel />
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setRechargeModel(false);
              }}
              sx={{ marginTop: 5 }}
            >
              Close
            </Button>
          </Stack>
        </Modal>
      </Stack>
    </Stack>
  );
};

export default Home;
