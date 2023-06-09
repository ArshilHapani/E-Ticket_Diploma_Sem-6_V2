import React, { SyntheticEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { profile_edit_textfield, modelAutocomplete } from "../styles";
import Spinner from "./Spinner";
import { BusStationDetailsProps } from "@/interfaces";
import { addStation } from "@/functions/api/dataPosters";

const AddStationsModel = ({ setOpen }: any) => {
  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: (value: BusStationDetailsProps) => addStation(value),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Successfully added new stations");
        setStations({
          id: 0,
          stName: "",
          lat: 0,
          long: 0,
        });
      } else {
        toast.error("Failed to add station\n" + data.msg);
      }
    },
  });
  const [stations, setStations] = useState({
    id: 0,
    stName: "",
    lat: 0,
    long: 0,
  });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      stations.id === null ||
      stations.id.toString() === "" ||
      stations.stName === "" ||
      stations.lat === null ||
      stations.id.toString() === "" ||
      stations.long === null ||
      stations.id.toString() === ""
    ) {
      toast.error("Please enter all required fields");
    } else {
      mutate({
        st_id: stations.id,
        st_lat: stations.lat,
        st_long: stations.long,
        st_name: stations.stName,
      });
    }
  };
  if (isLoading) <Spinner message={`Adding station ${stations?.stName}`} />;
  if (isError) toast.error(`Error adding station '${error}'`);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Station
        </Typography>
        <TextField
          label="station id"
          sx={profile_edit_textfield}
          variant="standard"
          color="info"
          type="number"
          value={stations.id}
          onChange={(e) => {
            setStations({
              ...stations,
              id: parseFloat(e.target.value),
            });
          }}
        />
        <TextField
          label="station name"
          sx={profile_edit_textfield}
          variant="standard"
          color="info"
          type="text"
          value={stations.stName}
          onChange={(e) => {
            setStations({
              ...stations,
              stName: e.target.value,
            });
          }}
        />
        <TextField
          label="latitude"
          sx={profile_edit_textfield}
          variant="standard"
          color="info"
          type="number"
          value={stations.lat}
          onChange={(e) => {
            setStations({
              ...stations,
              lat: parseFloat(e.target.value),
            });
          }}
        />

        <TextField
          label="longitude"
          sx={profile_edit_textfield}
          variant="standard"
          color="info"
          type="number"
          value={stations.long}
          onChange={(e) => {
            setStations({
              ...stations,
              long: parseFloat(e.target.value),
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
            Add Station
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddStationsModel;
