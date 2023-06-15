import { Button, Stack, TextField } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { style, modelTextField } from "../styles";
import Spinner from "./Spinner";
import { UpdateProfileAdminProps } from "@/interfaces";
import { updateProfile } from "@/functions/api/dataPosters";

type Props = {
  initialValues: {
    a_id: string;
    a_uname: string;
    created_by: string;
    a_name: string;
    a_email: string;
    a_no: string;
    a_dob: string;
    a_img: string;
  };
  closeModal: Function;
};

const EditProfileModal = ({ initialValues, closeModal }: Props) => {
  const [updateData, setUpdateData] = useState({
    name: initialValues.a_name,
    email: initialValues.a_email,
    mobile: initialValues.a_no,
    dob: initialValues.a_dob,
    username: initialValues.a_uname,
  });
  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: (values: UpdateProfileAdminProps) => updateProfile(values),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Profile updated successfully");
        closeModal(false);
      } else if (!response.success) {
        toast.error(response.msg);
      }
    },
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (
      updateData.name === "" ||
      updateData.email === "" ||
      updateData.mobile === "" ||
      updateData.dob === "" ||
      updateData.username === ""
    ) {
      toast.error("Please enter all the required fields");
      return;
    }
    if (updateData.mobile.length !== 10) {
      toast.error("The length of mobile number must be equal to 10");
      return;
    }
    mutate({
      a_dob: updateData.dob,
      a_email: updateData.email,
      a_name: updateData.name,
      a_no: parseInt(updateData.mobile),
      a_uname: updateData.username,
    });
  }
  if (isError) toast.error(`Error updating profile '${error}'`);
  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <Spinner message={`Editing profile ${updateData.name}`} />}

      <Stack sx={style} gap={2} direction="column">
        <TextField
          sx={modelTextField}
          value={updateData?.name}
          variant="standard"
          label="name"
          type="text"
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          }
        />

        <TextField
          sx={modelTextField}
          variant="standard"
          type="text"
          value={updateData?.username}
          label="username"
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setUpdateData({ ...updateData, username: e.target.value })
          }
        />

        <TextField
          sx={modelTextField}
          value={updateData?.email}
          variant="standard"
          type="email"
          label="email"
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setUpdateData({ ...updateData, email: e.target.value })
          }
        />

        <TextField
          sx={modelTextField}
          variant="standard"
          type="number"
          value={updateData?.mobile}
          label="mobile number"
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setUpdateData({ ...updateData, mobile: e.target.value })
          }
        />
        <TextField
          sx={modelTextField}
          variant="standard"
          type="date"
          value={updateData?.dob}
          label="date of Birth"
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setUpdateData({ ...updateData, dob: e.target.value })
          }
        />
        <Stack
          justifyContent="flex-end"
          gap={2}
          direction={{ sm: "column", xs: "column", md: "row", lg: "row" }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => closeModal(false)}
          >
            Close
          </Button>
          <Button variant="outlined" color="primary" type="submit">
            Update Profile
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EditProfileModal;
