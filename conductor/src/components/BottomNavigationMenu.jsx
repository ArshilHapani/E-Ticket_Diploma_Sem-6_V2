import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";
const BottomNavigationMenu = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/profile") {
      setValue(1);
    } else if (location.pathname === "/") {
      setValue(0);
    }
  }, [location]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        background: "rgba(255,255,255,0.7)",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Tooltip title="Home" placement="top" arrow>
          <BottomNavigationAction
            label="Home"
            icon={<AiOutlineHome size={25} />}
            onClick={() => navigate("/")}
          />
        </Tooltip>
        <Tooltip title="Profile" placement="top" arrow>
          <BottomNavigationAction
            label="Profile"
            icon={<BsPerson size={25} />}
            onClick={() => navigate("/profile")}
          />
        </Tooltip>
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavigationMenu;
