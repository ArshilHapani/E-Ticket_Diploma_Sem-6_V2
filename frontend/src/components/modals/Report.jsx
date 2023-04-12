import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from "@mui/material";
import useMuiStyles from "../../hooks/useMuiStyles";
import { useStateContext } from "../../context/stateContext";

export default function ReportABugModal({ open, setOpen }) {
  const { theme, showSnackBar } = useStateContext();
  const { modelStyle, modelTextField } = useMuiStyles();
  const handleClose = () => setOpen(false);
  const [start, setStart] = useState(false);
  const handleEnd = () => setStart(false);
  const [reportData, setReportData] = useState({
    topic: "",
    title: "",
    description: "",
  });
  function handleClick() {
    if (
      reportData.title === "" ||
      reportData.description === "" ||
      reportData.topic === ""
    ) {
      showSnackBar("Please enter all the required fields", "error");
      return;
    }
    console.log(reportData);
    setOpen(false);
    setStart(true);
    setReportData({
      topic: "",
      title: "",
      description: "",
    });
  }
  return (
    <>
      <Stack>
        <Modal open={open} onClose={handleClose}>
          <Stack gap={2} direction="column" alignItems="center" sx={modelStyle}>
            <Box
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              <IconButton onClick={handleClose}>
                <AiOutlineClose color="#da2c38" />
              </IconButton>
            </Box>
            <Stack justifyContent="center" alignItems="center" marginTop={3}>
              <Typography align="center" fontSize={17} fontWeight="bold">
                Report a bug or request a feature
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              sx={{
                width: {
                  xs: "50vw",
                  md: "30vw",
                  lg: "25vw",
                },
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <FormControl fullWidth>
                <Typography sx={{ marginBottom: "0.1rem" }}>
                  I would like to
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select"
                  sx={{ color: theme === "dark" ? "white" : "black" }}
                  value={reportData.topic}
                  onChange={(e) =>
                    setReportData({ ...reportData, topic: e.target.value })
                  }
                >
                  <MenuItem value={"Report a bug"}>Report a bug</MenuItem>
                  <MenuItem value={"Suggest feature"}>Suggest feature</MenuItem>
                  <MenuItem value={"Complain fraud"}>Complain fraud</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack
              sx={{
                width: {
                  xs: "50vw",
                  md: "30vw",
                  lg: "25vw",
                },
              }}
            >
              <Typography fontSize={16}>Title</Typography>
              <TextField
                required
                placeholder="Enter a title"
                variant="outlined"
                fullWidth
                sx={modelTextField}
                value={reportData.title}
                onChange={(e) =>
                  setReportData({ ...reportData, title: e.target.value })
                }
              />
            </Stack>
            <Stack
              sx={{
                width: {
                  xs: "50vw",
                  md: "30vw",
                  lg: "25vw",
                },
              }}
            >
              <Typography fontSize={16}>Description</Typography>
              <TextField
                required
                placeholder="Enter a description"
                variant="outlined"
                rows={4}
                multiline
                fullWidth
                sx={modelTextField}
                value={reportData.description}
                onChange={(e) =>
                  setReportData({ ...reportData, description: e.target.value })
                }
              />
            </Stack>
            <Button
              variant="outlined"
              type="submit"
              fullWidth
              sx={{ marginTop: 4 }}
              onClick={handleClick}
            >
              Submit
            </Button>
          </Stack>
        </Modal>
      </Stack>

      {/* success screen */}
      <Modal open={start} onClose={handleEnd}>
        <Stack gap={4} direction="column" alignItems="center" sx={modelStyle}>
          <Box
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
            }}
          >
            <IconButton onClick={handleEnd}>
              <AiOutlineClose color="#da2c38" />
            </IconButton>
          </Box>
          <IoMdCheckmarkCircleOutline fontSize={50} color="#29bf12" />
          <Typography fontSize={16} align="center">
            Thank you for your request.It's very helpful for us!
          </Typography>
        </Stack>
      </Modal>
    </>
  );
}
