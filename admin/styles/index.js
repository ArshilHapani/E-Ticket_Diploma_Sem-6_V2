// For profile textfields
const profile_edit_textfield = {
  "& .MuiFormLabel-root": {
    color: "#0d1b2a",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "#0d1b2a",
  },
  "& .MuiInputBase-root": {
    color: "#0d1b2a",
  },
  "& label.Mui-focused": {
    color: "#0d1b2a",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "secondary",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#0d1b2a",
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "#0d1b2a",
  },
  "&:hover": {
    borderBottomColor: "#0d1b2a",
  },
  width: "100%",
  margin: "0.4rem 0",
};

const modelAutocomplete = {
  margin: "0.4rem",
  generateTicketButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: {
      sm: "center",
      md: "center",
      lg: "flex-end",
      xl: "flex-end",
    },
    flexWrap: "wrap",
    flexDirection: {
      sm: "column",
      xs: "column",
      md: "row",
      lg: "row",
    },
  },
  generateTicketButton: {
    marginTop: "1.2rem",
    width: {
      sm: "15rem",
      md: "auto",
    },
    marginRight: "0.6rem",
    "&:disabled": {
      backgroundColor: "#1976d2",
    },
    backgroundColor: "primary",
    cancelButton: {
      marginTop: "1.2rem",
      marginRight: "0.6rem",
      width: {
        sm: "15rem",
        md: "auto",
      },
    },
  },
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 300,
    sm: 350,
    md: 400,
    lg: 500,
  },
  bgcolor: "#f2f2f2",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
const modelTextField = {
  "& .MuiFormLabel-root": {
    color: "#0d1b2a",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "#0d1b2a",
  },
  "& .MuiInputBase-root": {
    color: "#0d1b2a",
  },
  "& label.Mui-focused": {
    color: "#0d1b2a",
  },
  "& .MuiAutocomplete-root": {
    margin: "1vh",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "secondary",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#0d1b2a",
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "#0d1b2a",
  },
  "& .MuiSvgIcon-root": {
    color: "#0d1b2a",
  },
  "& + .MuiAutocomplete-popper": {
    backgroundColor: "#363636",
  },
  "&:hover": {
    borderBottomColor: "#0d1b2a",
  },
  height: "3rem",
};

export { modelAutocomplete, profile_edit_textfield, style, modelTextField };
