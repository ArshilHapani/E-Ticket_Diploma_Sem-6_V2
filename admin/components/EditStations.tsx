import React, { SyntheticEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { profile_edit_textfield, modelAutocomplete } from "../styles";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { BusStationDetailsProps } from "@/interfaces";
import { updateStations } from "@/functions/api/dataPosters";

const EditStations = ({ setOpen, initialValues }: any) => {
  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: (value: BusStationDetailsProps) => updateStations(value),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("stations edited successfully");
        setOpen(false);
      } else if (!data.success) {
        toast.error(data.msg);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const [stations, setStations] = useState({
    ...initialValues,
  });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      stations.id === "" ||
      stations.name === "" ||
      stations.latitude === "" ||
      stations.longitude === ""
    ) {
      toast.error("Please enter all the required fields");
      return;
    }
    mutate({
      st_id: stations.id,
      st_name: stations.name,
      st_lat: stations.latitude,
      st_long: stations.longitude,
    });
  };
  if (isError) toast.error(`Error editing station '${error}'`);
  if (isLoading) <Spinner message={`Editing station ${stations?.name}`} />;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update stations <b>{stations.name}</b>
        </Typography>
        <TextField
          label="station id"
          sx={profile_edit_textfield}
          variant="standard"
          color="info"
          type="number"
          disabled
          hidden
          value={stations.id}
          onChange={(e) => {
            setStations({
              ...stations,
              id: e.target.value,
            });
          }}
        />
        <TextField
          label="station name"
          sx={profile_edit_textfield}
          variant="standard"
          color="info"
          type="text"
          value={stations.name}
          onChange={(e) => {
            setStations({
              ...stations,
              name: e.target.value,
            });
          }}
        />

        <TextField
          label="latitude"
          sx={profile_edit_textfield}
          variant="standard"
          color="info"
          type="number"
          value={stations.latitude}
          onChange={(e) => {
            setStations({
              ...stations,
              latitude: e.target.value,
            });
          }}
        />
        <TextField
          label="longitude"
          sx={profile_edit_textfield}
          placeholder="create email"
          variant="standard"
          color="info"
          type="number"
          value={stations.longitude}
          onChange={(e) => {
            setStations({
              ...stations,
              longitude: e.target.value,
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
            edit stations
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditStations;
