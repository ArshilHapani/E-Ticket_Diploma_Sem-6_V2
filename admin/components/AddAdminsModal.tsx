import React, { SyntheticEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { profile_edit_textfield, modelAutocomplete } from "../styles";
import isUserNameValid from "@/functions/userNameValidate";
import validateEmail from "@/functions/validateEmail";
import Spinner from "./Spinner";
import { RawAdminDetailsProps } from "@/interfaces";
import { addAdmin } from "@/functions/api/dataPosters";

const AddAdmins = ({ setOpen }: any) => {
  const [admin, setAdmin] = useState({
    uname: "",
    pwd: "",
    name: "",
    email: "",
    dob: "",
    no: "",
  });
  const { mutate, isError, error, isLoading } = useMutation({
    mutationFn: (values: RawAdminDetailsProps) => addAdmin(values),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Successfully created a new admin");
        setOpen(false);
      } else if (!response.success) {
        toast.error(response.msg);
      }
    },
  });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      admin.uname === "" ||
      admin.pwd === "" ||
      admin.name === "" ||
      admin.email === "" ||
      admin.dob === "" ||
      admin.no === ""
    ) {
      toast.error("Please enter all required fields");
      return;
    }
    if (!isUserNameValid(admin.uname)) {
      toast.error("Please enter valid username");
      return;
    }
    if (validateEmail(admin.email) === null) {
      toast.error("please enter valid email format");
      return;
    }
    if (admin.no.toString().length !== 10) {
      toast.error("Please enter valid mobile number with length 10");
      return;
    }
    mutate({
      a_uname: admin.uname,
      a_pwd: admin.pwd,
      a_name: admin.name,
      a_email: admin.email,
      a_dob: admin.dob,
      a_no: parseInt(admin.no),
    });
  };
  if (isError) toast.error(`Error creating admin '${error}'`);
  return (
    <div>
      {isLoading && <Spinner message={`Adding admin ${admin.name}`} />}

      <form onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create admin
        </Typography>
        <TextField
          label="name"
          sx={profile_edit_textfield}
          placeholder="create name"
          variant="standard"
          color="info"
          type="text"
          value={admin.name}
          onChange={(e) => {
            setAdmin({
              ...admin,
              name: e.target.value,
            });
          }}
        />
        <TextField
          label="password"
          sx={profile_edit_textfield}
          placeholder="create password"
          variant="standard"
          color="info"
          type="text"
          value={admin.pwd}
          onChange={(e) => {
            setAdmin({
              ...admin,
              pwd: e.target.value,
            });
          }}
        />
        <TextField
          label="username"
          sx={profile_edit_textfield}
          placeholder="create username"
          variant="standard"
          color="info"
          type="text"
          value={admin.uname}
          onChange={(e) => {
            setAdmin({
              ...admin,
              uname: e.target.value,
            });
          }}
        />

        <TextField
          label="email"
          sx={profile_edit_textfield}
          placeholder="create email"
          variant="standard"
          color="info"
          type="text"
          value={admin.email}
          onChange={(e) => {
            setAdmin({
              ...admin,
              email: e.target.value,
            });
          }}
        />
        <TextField
          label="mobile number"
          sx={profile_edit_textfield}
          placeholder="enter mobile number"
          variant="standard"
          color="info"
          type="number"
          value={admin.no}
          onChange={(e) => {
            setAdmin({
              ...admin,
              no: e.target.value,
            });
          }}
        />
        <TextField
          label="date of birth"
          sx={profile_edit_textfield}
          variant="standard"
          color="info"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={admin.dob}
          onChange={(e) => {
            setAdmin({
              ...admin,
              dob: e.target.value,
            });
          }}
        />
        <Box sx={modelAutocomplete.generateTicketButtonContainer}>
          <Button
            variant="outlined"
            color="error"
            sx={modelAutocomplete.generateTicketButton.cancelButton}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            type="submit"
            sx={modelAutocomplete.generateTicketButton}
          >
            create admin
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddAdmins;
