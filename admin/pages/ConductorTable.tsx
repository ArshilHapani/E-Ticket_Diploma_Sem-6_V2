"use client";

import { useState } from "react";
import {
  Avatar,
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
import { SiMicrosoftexcel } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";

import EditConductor from "@/components/EditConductorModel";
import { style } from "../styles";
import { toast } from "react-hot-toast";
import CreateConductorModel from "@/components/CreateConductorModel";
import {
  handleDownloadSampleExcel,
  readConductorExcel,
} from "@/functions/readAndUploadExcel";
import Spinner from "@/components/Spinner";
import { fetchConductors } from "@/functions/api/dataFetchers";
import { deleteConductor } from "@/functions/api/dataPosters";
interface funcData {
  img: string;
  id: string;
  name: string;
  uname: string;
  email: string;
  mobile: string;
  dob: string;
}

const ConductorTable = () => {
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [conductorModal, setConductorModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [indexMeasure, setIndexMeasure] = useState<number>(0);
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["fetchConductor"],
    queryFn: fetchConductors,
    refetchInterval: 3000,
  });
  const student_rows = data?.map((data: any) =>
    createData(
      data.c_img,
      data.c_id,
      data.c_name,
      data.c_uname,
      data.c_email,
      data.c_no,
      data.c_dob
    )
  );

  function createData(
    img: string,
    id: string,
    name: string,
    uname: string,
    email: string,
    mobile: string,
    dob: string
  ): funcData {
    return {
      img,
      id,
      name,
      uname,
      email,
      mobile,
      dob,
    };
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

  if (isLoading) return <Spinner message="Updating..." />;
  if (loading) return <Spinner message="Loading..." />;
  return (
    <>
      <div className="mt-[16vh] px-5 p-4">
        <div className="flex-col sm:flex-row justify-between  md:items-center items-start gap-3 my-5 flex">
          <Typography variant="h4" className="text-slate-500">
            Manage Conductors
          </Typography>
          <div className="flex gap-4">
            <Button variant="outlined" onClick={() => setConductorModal(true)}>
              Add Conductor
            </Button>
            <Modal
              open={conductorModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModal}>
                <CreateConductorModel setOpen={setConductorModal} />
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
                onChange={(e) => readConductorExcel(e, setLoading)}
              />
            </Button>
            <Tooltip title="Download sample excel file" placement="bottom">
              <IconButton color="success" onClick={handleDownloadSampleExcel}>
                <AiOutlineBulb />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <h1>{isError && `Something went wrong  ${error}`}</h1>
        <TableContainer component={Paper} sx={{ marginBottom: "100px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>User name</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Mobile number</TableCell>
                <TableCell>Date of Birth</TableCell>
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
                  <TableCell component="th" scope="row">
                    <Avatar
                      src={
                        row?.img !== null && typeof row?.img === "string"
                          ? row?.img
                          : " "
                      }
                      alt={row.name}
                    >
                      {row.img === null && row.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.uname}</TableCell>
                  <TableCell>
                    {row.email === "" ? "not added" : row.email}
                  </TableCell>
                  <TableCell>
                    {row.mobile === null ? "not added" : row.mobile}
                  </TableCell>
                  <TableCell>{row.dob}</TableCell>
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
                        index={index}
                        uname={row.uname}
                        open={confirmDialog}
                        indexMeasure={indexMeasure}
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

export default ConductorTable;

function ButtonAnnotation({ row, index, setOpen, open, indexMeasure }: any) {
  return (
    <Modal
      open={indexMeasure === index ? open : false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // @ts-ignore
      key={row.img + index}
    >
      <Box sx={style}>
        {/*@ts-ignore */}
        <EditConductor setOpen={setOpen} initialValues={row} />
      </Box>
    </Modal>
  );
}

type dialogModel = {
  open: boolean;
  setOpen: Function;
  uname: string;
  indexMeasure: number;
  index: number;
};

function OpenDialogModal({
  open,
  setOpen,
  uname,
  index,
  indexMeasure,
}: dialogModel) {
  const { mutate, isError, error } = useMutation({
    mutationFn: (value: { uname: string }) => deleteConductor(value),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`${uname} deleted successfully`);
        setOpen(false);
      } else if (!data.success) {
        toast.error(data.msg);
      } else {
        toast.error("Failed to delete conductor");
      }
    },
  });
  if (isError) toast.error(`Error deleting conductor '${error}'`);
  return (
    <Dialog
      open={indexMeasure === index ? open : false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="text-gray-500 text-base">
        Are you sure? that you want to delete <b>{uname}</b>
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="error" variant="outlined">
          Disagree
        </Button>
        <Button
          onClick={() => mutate({ uname })}
          color="success"
          variant="outlined"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
