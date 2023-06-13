import React, { SyntheticEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { profile_edit_textfield, modelAutocomplete } from "../styles";
import { UserDetailsProps, functionEditUserModelProps } from "@/interfaces";
import isUserNameValid from "@/functions/userNameValidate";
import validateEmail from "@/functions/validateEmail";
import Spinner from "./Spinner";
import { editUser } from "@/functions/api/dataPosters";

const EditUser = ({ setOpen, initialValues }: functionEditUserModelProps) => {
  const [user, setUser] = useState({
    ...initialValues,
  });
  const { isLoading, error, isError, mutate } = useMutation({
    mutationFn: (value: UserDetailsProps) => editUser(value),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("user edited successfully");
        setOpen(false);
      } else if (!data.success) {
        toast.error(data.msg);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      user.name === null ||
      user.name === "" ||
      user.uname === null ||
      user.uname === "" ||
      user.email === null ||
      user.email === "" ||
      user.balance === null ||
      user.balance.toString() === ""
    ) {
      toast.error("Please enter all the required fields");
      return;
    }
    if (!isUserNameValid(user.uname)) {
      toast.error("Please enter valid username");
      return;
    }
    if (validateEmail(user.email) === null) {
      toast.error("please enter valid email format");
      return;
    }
    mutate({
      p_balance: user.balance,
      p_email: user.email,
      p_id: user.id,
      p_name: user.name,
      p_uname: user.uname,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <Spinner message={`Editing user ${user?.name}`} />}

      <Typography id="modal-modal-title" variant="h6" component="h2">
        Manage User {isError && `Error editing user ${error}`}
      </Typography>
      <TextField
        label="name"
        sx={profile_edit_textfield}
        variant="standard"
        color="info"
        type="text"
        value={user.name || ""}
        onChange={(e) => {
          setUser({
            ...user,
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
        value={user.uname || ""}
        onChange={(e) => {
          setUser({
            ...user,
            uname: e.target.value,
          });
        }}
      />

      <TextField
        label="email"
        sx={profile_edit_textfield}
        variant="standard"
        color="info"
        type="text0"
        value={user.email || ""}
        onChange={(e) => {
          setUser({
            ...user,
            email: e.target.value,
          });
        }}
      />
      <TextField
        label="balance"
        sx={profile_edit_textfield}
        variant="standard"
        color="info"
        type="number"
        value={user.balance || 0}
        onChange={(e) => {
          setUser({
            ...user,
            balance: parseFloat(e.target.value),
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
          edit user
        </Button>
      </Box>
    </form>
  );
};

export default EditUser;
