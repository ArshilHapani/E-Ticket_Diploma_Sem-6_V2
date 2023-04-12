import {
  Box,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { BsSun } from "react-icons/bs";
import { GoReport } from "react-icons/go";

import { useStateContext } from "../../context/stateContext";
import useMuiStyles from "../../hooks/useMuiStyles";

import "./Settings.scss";
import ReportABugModal from "../modals/Report";
import { FiLogOut } from "react-icons/fi";
const Settings = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  if (
    localStorage.getItem("user") === null ||
    localStorage.getItem("user") === undefined ||
    localStorage.getItem("user") === ""
  ) {
    navigate("/signUp");
  }
  document.title = "E-Ticket | Settings";
  const { theme, setTheme } = useStateContext();
  const [alignment, setAlignment] = React.useState(
    localStorage.getItem("theme") !== null || undefined
      ? localStorage.getItem("theme")
      : "light"
  );
  const { textTheme } = useMuiStyles();

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setTheme(newAlignment);
    }
    if (newAlignment === "system") {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  };

  return (
    <Box
      className={`settings__container ${theme === "light" ? "light" : "dark"}`}
    >
      <Container>
        <Typography
          sx={{
            fontSize: 30,
            marginBottom: "1rem",
          }}
        >
          Theme
        </Typography>

        {/* Toggle Buttons */}
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton sx={textTheme} value="dark">
            <CiDark fontSize={20} />{" "}
            <Typography sx={{ marginLeft: 1 }}>Dark</Typography>
          </ToggleButton>
          <ToggleButton sx={textTheme} value="system">
            <WiMoonAltFirstQuarter fontSize={20} />{" "}
            <Typography sx={{ marginLeft: 1 }}>System</Typography>
          </ToggleButton>
          <ToggleButton sx={textTheme} value="light">
            <BsSun fontSize={20} />{" "}
            <Typography sx={{ marginLeft: 1 }}>Light</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <br />
        <br />
        <Typography
          sx={{
            fontSize: 30,
            marginBottom: "1rem",
          }}
        >
          Report / Contact
        </Typography>
        <Button
          variant="outlined"
          endIcon={<GoReport />}
          onClick={() => setOpen(true)}
        >
          Report a bug
        </Button>
        <ReportABugModal open={open} setOpen={setOpen} />
        <br />
        <br />
        <Typography
          sx={{
            fontSize: 30,
            marginBottom: "1rem",
          }}
        >
          Log out ?
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/signIn");
          }}
          endIcon={<FiLogOut />}
        >
          Log out
        </Button>
      </Container>
    </Box>
  );
};

export default Settings;
