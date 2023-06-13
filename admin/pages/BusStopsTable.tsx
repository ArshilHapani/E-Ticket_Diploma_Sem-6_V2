import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { AiOutlineBulb, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { SiMicrosoftexcel } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";

import { style } from "../styles";
import EditStations from "@/components/EditStations";
import AddStationsModel from "@/components/AddStationsModel";
import Spinner from "@/components/Spinner";
import {
  handleDownloadSampleExcel,
  readBusStopsExcel,
} from "@/functions/readAndUploadExcel";
import { fetchStations } from "@/functions/api/dataFetchers";
import { deleteStation } from "@/functions/api/dataPosters";

interface funcData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f2f2f2",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const BusStopsTable = () => {
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [indexMeasure, setIndexMeasure] = useState<number>(0);
  const [stationModal, setStationModal] = useState<boolean>(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["busStops"],
    queryFn: fetchStations,
    refetchInterval: 3000,
  });

  const student_rows = data?.map((data: any) =>
    createData(data.st_id, data.st_name, data.st_lat, data.st_long)
  );

  function createData(
    id: number,
    name: string,
    latitude: number,
    longitude: number
  ): funcData {
    return {
      id,
      name,
      latitude,
      longitude,
    };
  }

  return (
    <>
      {loading && <Spinner message="Updating..." />}
      {isLoading && <Spinner message="Fetching data..." />}
      <div className="mt-[16vh] px-5 p-4">
        <div className="flex-col sm:flex-row justify-between  md:items-center items-start gap-3 my-5 flex">
          <Typography variant="h4" className="text-slate-500 ">
            Manage Bus Stops {isError && `Error fetching stations '${error}'`}
          </Typography>
          <div className="flex gap-4">
            <Button variant="outlined" onClick={() => setStationModal(true)}>
              Add Bus Stop
            </Button>
            <Modal
              open={stationModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModal}>
                <AddStationsModel setOpen={setStationModal} />
              </Box>
            </Modal>
            <Button
              variant="outlined"
              component="label"
              endIcon={<SiMicrosoftexcel />}
              sx={{
                width: "180px",
              }}
            >
              Upload excel
              <input
                hidden
                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                onChange={(e) => readBusStopsExcel(e, setLoading)}
              />
            </Button>
            <Tooltip title="Download sample excel file" placement="bottom">
              <IconButton color="success" onClick={handleDownloadSampleExcel}>
                <AiOutlineBulb />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <TableContainer component={Paper} sx={{ marginBottom: "100px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Station ID</TableCell>
                <TableCell>Station name</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student_rows?.map((row: any, index: number) => (
                <TableRow
                  key={row.mobile + row.email + row.uname + row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.latitude}</TableCell>
                  <TableCell>{row.longitude}</TableCell>
                  <TableCell>
                    <Tooltip title={`Edit ${row.name}`} arrow placement="right">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                          setIndexMeasure(index);
                        }}
                      >
                        <AiOutlineEdit />
                      </IconButton>
                    </Tooltip>
                    <ButtonAnnotation
                      open={open}
                      indexMeasure={indexMeasure}
                      row={row}
                      index={index}
                      setOpen={setOpen}
                    />
                  </TableCell>
                  <TableCell>
                    <>
                      <Tooltip
                        title={`Delete ${row.name}`}
                        arrow
                        placement="right"
                      >
                        <IconButton
                          color="error"
                          onClick={() => {
                            setConfirmDialog(true);
                            setIndexMeasure(index);
                          }}
                        >
                          <AiOutlineDelete />
                        </IconButton>
                      </Tooltip>
                      <OpenDialogModal
                        st_id={row.id}
                        name={row.name}
                        index={index}
                        indexMeasure={indexMeasure}
                        open={confirmDialog}
                        setOpen={setConfirmDialog}
                      />
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default BusStopsTable;

function ButtonAnnotation({ row, index, setOpen, open, indexMeasure }: any) {
  return (
    <Modal
      open={indexMeasure === index ? open : false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // @ts-ignore
      key={row.st_lat + row.st_long + index}
    >
      <Box sx={style}>
        {/*@ts-ignore */}
        <EditStations setOpen={setOpen} initialValues={row} />
      </Box>
    </Modal>
  );
}

type dialogModel = {
  open: boolean;
  setOpen: Function;
  st_id: number;
  indexMeasure: number;
  name: string;
  index: number;
};

function OpenDialogModal({
  open,
  setOpen,
  st_id,
  name,
  indexMeasure,
  index,
}: dialogModel) {
  const { mutate, isError, error, isLoading } = useMutation({
    mutationFn: (value: { st_id: number }) => deleteStation(value),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`${name} deleted successfully`);
        setOpen(false);
      } else if (!data.success) {
        toast.error(data.msg);
      } else {
        toast.error("Failed to delete conductor");
      }
    },
  });
  if (isError) toast.error(`Error deleting station '${error}'`);
  if (isLoading) return <Spinner message="Deleting station..." />;
  return (
    <Dialog
      open={indexMeasure === index ? open : false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure? that you want to delete <b>{name}</b>
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="error" variant="outlined">
          Disagree
        </Button>
        <Button
          onClick={() => mutate({ st_id })}
          color="success"
          variant="outlined"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
