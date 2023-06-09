import React, { SyntheticEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { profile_edit_textfield, modelAutocomplete } from "../styles";
import isUserNameValid from "@/functions/userNameValidate";
import validateEmail from "@/functions/validateEmail";
import Spinner from "./Spinner";
import { AddConductorFunctionProps } from "@/interfaces";
import { addConductor } from "@/functions/api/dataPosters";

const CreateConductorModel = ({ setOpen }: any) => {
  const { isLoading, error, isError, mutate } = useMutation({
    mutationFn: (value: AddConductorFunctionProps) => addConductor(value),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Successfully created a new conductor");
        setOpen(false);
      } else if (!data.success) {
        toast.error(data.msg);
      }
    },
  });

  const [conductor, setConductor] = useState({
    uname: "",
    pwd: "",
    name: "",
    email: "",
    dob: "",
  });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      conductor.uname === "" ||
      conductor.pwd === "" ||
      conductor.name === "" ||
      conductor.email === "" ||
      conductor.dob === ""
    ) {
      toast.error("Please enter all required fields");
      return;
    }
    if (!isUserNameValid(conductor.uname)) {
      toast.error("Please enter valid username");
      return;
    }
    if (validateEmail(conductor.email) === null) {
      toast.error("please enter valid email format");
      return;
    }
    mutate({
      c_uname: conductor.uname,
      c_dob: conductor.dob,
      c_email: conductor.email,
      c_name: conductor.name,
      c_pwd: conductor.pwd,
    });
  };
  if (isError)
    toast.error(`Error occurred while creating conductor '${error}'`);
  return (
    <div>
      {isLoading && (
        <Spinner message={`Creating conductor ${conductor?.name}`} />
      )}

      <form onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Conductor
        </Typography>
        <TextField
          label="name"
          sx={profile_edit_textfield}
          placeholder="create name"
          variant="standard"
          color="info"
          type="text"
          value={conductor.name}
          onChange={(e) => {
            setConductor({
              ...conductor,
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
          value={conductor.pwd}
          onChange={(e) => {
            setConductor({
              ...conductor,
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
          value={conductor.uname}
          onChange={(e) => {
            setConductor({
              ...conductor,
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
          value={conductor.email}
          onChange={(e) => {
            setConductor({
              ...conductor,
              email: e.target.value,
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
          value={conductor.dob}
          onChange={(e) => {
            setConductor({
              ...conductor,
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
            create conductor
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateConductorModel;
