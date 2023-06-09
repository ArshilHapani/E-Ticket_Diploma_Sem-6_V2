import { useState, useEffect } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { SiMicrosoftexcel } from "react-icons/si";

import { style } from "../styles";
import EditAdmin from "@/components/EditAdminModal";
import AddAdmins from "@/components/AddAdminsModal";
import Spinner from "@/components/Spinner";
import {
  handleDownloadSampleExcel,
  readAdminExcel,
} from "@/functions/readAndUploadExcel";
import { fetchAdmins } from "@/functions/api/dataFetchers";
import { deleteAdmin } from "@/functions/api/dataPosters";

interface funcData {
  img: string;
  id: string;
  name: string;
  uname: string;
  email: string;
  mobile: string;
  dob: string;
  createdBy: string;
}

const AdminTable = () => {
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [indexMeasure, setIndexMeasure] = useState<number>(0);
  const [adminModal, setAdminModal] = useState<boolean>(false);
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["admin", "all_admins"],
    queryFn: fetchAdmins,
    refetchInterval: 3000,
  });
  const student_rows = data?.map((data: any) =>
    createData(
      data.a_img,
      data.a_id,
      data.a_name,
      data.a_uname,
      data.a_email,
      data.a_no,
      data.a_dob,
      data.created_uname
    )
  );

  function createData(
    img: string,
    id: string,
    name: string,
    uname: string,
    email: string,
    mobile: string,
    dob: string,
    createdBy: string
  ): funcData {
    return {
      img,
      id,
      name,
      uname,
      email,
      mobile,
      dob,
      createdBy,
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
  return (
    <>
      {isLoading && <Spinner message="Fetching admins..." />}
      {loading && <Spinner message="Adding admins..." />}
      <div className="mt-[16vh] px-5 p-4">
        <div className="flex-col sm:flex-row justify-between  md:items-center items-start gap-3 my-5 flex">
          <Typography variant="h4" className="text-slate-500">
            Manage Admins {isError && `Error fetching admins '${error}'`}
          </Typography>
          <div className="flex gap-4">
            <Button variant="outlined" onClick={() => setAdminModal(true)}>
              Add Admin
            </Button>
            <Modal
              open={adminModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModal}>
                <AddAdmins setOpen={setAdminModal} />
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
                onChange={(e) => readAdminExcel(e, setLoading)}
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
                <TableCell>Image</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>User name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created By</TableCell>
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
                    <Avatar src={row?.img ?? row?.img} alt={row.name}>
                      {row.img === null && row.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.uname}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.createdBy}
                  </TableCell>
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

export default AdminTable;

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
        <EditAdmin setOpen={setOpen} initialValues={row} />
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
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (value: { a_uname: string }) => deleteAdmin(value),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(`${uname} deleted successfully`);
        setOpen(false);
      } else if (!res.success) {
        toast.error(res.msg);
      } else {
        toast.error("Failed to delete conductor");
      }
    },
  });
  if (isError) toast.error(`Error deleting admin '${error}'`);
  if (isLoading) <Spinner message={`Deleting admin '${uname}'...`} />;
  return (
    <Dialog
      open={indexMeasure === index ? open : false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: "3rem" }}
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure? that you want to delete <b>{uname}</b>
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="error" variant="outlined">
          Disagree
        </Button>
        <Button
          onClick={() => mutate({ a_uname: uname })}
          color="success"
          variant="outlined"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
