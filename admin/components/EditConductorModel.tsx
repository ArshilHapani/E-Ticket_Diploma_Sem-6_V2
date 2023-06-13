"use client";

import React, { SyntheticEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { profile_edit_textfield, modelAutocomplete } from "../styles";
import isUserNameValid from "@/functions/userNameValidate";
import validateEmail from "@/functions/validateEmail";
import Spinner from "./Spinner";
import { updateConductor } from "@/functions/api/dataPosters";

const EditConductor = ({ setOpen, initialValues }: any) => {
  const { isLoading, mutate, error, isError } = useMutation({
    mutationFn: (value: any) =>
      updateConductor(value.c_id, value.c_uname, value.c_name, value.c_email),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Conductor edited successfully");
        setOpen(false);
      } else if (!data?.success) {
        toast.error(data?.msg);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const [conductor, setConductor] = useState({
    ...initialValues,
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      conductor.name === "" ||
      conductor.uname === "" ||
      conductor.email === ""
    ) {
      toast.error("Please enter all the required fields");
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
      c_id: conductor.id,
      c_uname: conductor.uname,
      c_name: conductor.name,
      c_email: conductor.email,
    });
  };
  if (isError) toast.error(`Something went wrong '${error}'`);
  return (
    <div>
      {isLoading && (
        <Spinner message={`Editing conductor ${conductor?.name}`} />
      )}

      <form onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Conductor
        </Typography>
        <TextField
          label="name"
          sx={profile_edit_textfield}
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
          label="username"
          sx={profile_edit_textfield}
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
          variant="standard"
          color="info"
          type="email"
          value={conductor.email}
          onChange={(e) => {
            setConductor({
              ...conductor,
              email: e.target.value,
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
            edit conductor
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditConductor;
