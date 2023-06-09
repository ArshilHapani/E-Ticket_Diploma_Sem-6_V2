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
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

import { style } from "../styles";
import EditUser from "@/components/EditUserModel";
import {
  userTableButtonAnnotationTypes,
  userTableFuncData,
} from "@/interfaces";
import { deleteUser } from "@/functions/api/dataPosters";
import { fetchUsers } from "@/functions/api/dataFetchers";
import Spinner from "@/components/Spinner";

const UserTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [indexMeasure, setIndexMeasure] = useState<number>(0);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUsers,
    refetchInterval: 3000,
  });
  const student_rows = data?.map((data: any) =>
    createData(
      data.p_img,
      data.p_id,
      data.p_name,
      data.p_uname,
      data.p_email,
      data.p_no,
      data.p_dob,
      data.p_balance
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
    balance: number
  ): userTableFuncData {
    return {
      img,
      id,
      name,
      uname,
      email,
      mobile,
      dob,
      balance,
    };
  }

  return (
    <>
      {isLoading && <Spinner message="Fetching user" />}
      <div className="mt-[16vh] px-5 p-4">
        <Typography variant="h4" className="my-5 text-slate-500">
          All users {isError && `Error fetching user ${error}`}
        </Typography>
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
                <TableCell>Balance</TableCell>
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
                  <TableCell>{row.balance}</TableCell>
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
                    <Tooltip
                      title={`Delete ${row.name}`}
                      arrow
                      placement="right"
                    >
                      <IconButton
                        color="error"
                        onClick={() => {
                          setDeleteModal(true);
                          setIndexMeasure(index);
                        }}
                      >
                        <AiOutlineDelete />
                      </IconButton>
                    </Tooltip>
                    <OpenDialogModal
                      open={deleteModal}
                      setOpen={setDeleteModal}
                      uname={row.uname}
                      index={index}
                      indexMeasure={indexMeasure}
                    />
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

export default UserTable;

function ButtonAnnotation({
  row,
  index,
  setOpen,
  open,
  indexMeasure,
}: userTableButtonAnnotationTypes) {
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
        <EditUser setOpen={setOpen} initialValues={row} />
      </Box>
    </Modal>
  );
}

function OpenDialogModal({ open, setOpen, uname, index, indexMeasure }: any) {
  const { mutate, isError, error } = useMutation({
    mutationFn: (value: { uname: string }) => deleteUser(value),
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
  if (isError) toast.error(`Error deleting user '${error}'`);
  return (
    <Dialog
      open={indexMeasure === index ? open : false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
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
