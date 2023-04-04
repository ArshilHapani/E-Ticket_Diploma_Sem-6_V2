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

export default function ReportABugModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  const [start, setStart] = useState(false);

  const handleEnd = () => setStart(false);

  const [Opt, setOpt] = useState("");
  const handleChange = (event) => setOpt(event.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setStart(true);
  };
  return (
    <>
      <Stack
        sx={{
          width: {
            xs: "80vw",
            md: "30vw",
            lg: "25vw",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Modal open={open} onClose={handleClose}>
            <Stack
              gap={2}
              direction="column"
              alignItems="center"
              sx={{
                width: {
                  xs: "50vw",
                  md: "30vw",
                  lg: "25vw",
                },
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 5,
                p: 5,
                borderRadius: "8px",
              }}
            >
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
                    value={Opt}
                    placeholder="Select"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Report a bug</MenuItem>
                    <MenuItem value={2}>Suggest feature</MenuItem>
                    <MenuItem value={3}>Complain fraud</MenuItem>
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
                />
              </Stack>
              <Button
                variant="outlined"
                type="submit"
                fullWidth
                sx={{ marginTop: 4 }}
              >
                Submit
              </Button>
            </Stack>
          </Modal>
        </form>
      </Stack>
      <Modal open={start} onClose={handleEnd}>
        <Stack
          gap={4}
          direction="column"
          alignItems="center"
          sx={{
            width: {
              xs: "50vw",
              md: "30vw",
              lg: "25vw",
            },
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 5,
            p: 6,
            borderRadius: "8px",
          }}
        >
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
