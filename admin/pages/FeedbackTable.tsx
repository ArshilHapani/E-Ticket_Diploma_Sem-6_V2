"use client";

import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { VscReply } from "react-icons/vsc";
import { useMutation } from "@tanstack/react-query";

import { style } from "../styles";
import ReplyFeedBackModal from "@/components/ReplyFeedbackModal";
import Spinner from "@/components/Spinner";
import { fetchFeedback } from "@/functions/api/dataFetchers";

interface funcData {
  a_id: string | null;
  f_id: string | null;
  f_status: string;
  f_time: string;
  feedback: string;
  p_id: string;
  r_time: string | null;
  reply: string | null;
  p_uname: string;
}

const FeedBackTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [indexMeasure, setIndexMeasure] = useState<number>(0);
  const { data, isLoading, error, isError, mutate } = useMutation({
    mutationFn: (values: { type: string }) => fetchFeedback(values.type),
  });
  useEffect(() => {
    mutate({ type: "All" });
  }, []);

  const student_rows = data?.map((data: any) =>
    createData(
      data.a_id,
      data.f_id,
      data.f_status,
      data.f_time,
      data.feedback,
      data.p_id,
      data.r_time,
      data.reply,
      data.p_uname
    )
  );

  function createData(
    a_id: string,
    f_id: string,
    f_status: string,
    f_time: string,
    feedback: string,
    p_id: string,
    r_time: string,
    reply: string,
    p_uname: string
  ): funcData {
    return {
      a_id,
      f_id,
      f_status,
      f_time,
      feedback,
      p_id,
      r_time,
      reply,
      p_uname,
    };
  }

  return (
    <>
      {isLoading && <Spinner message="fetching feedback..." />}
      <div className="mt-[16vh] px-5 p-4">
        <div className="flex justify-between items-center my-5 ">
          <Typography variant="h4" className="text-slate-500">
            User Feedbacks {isError && `Error fetching feedbacks '${error}'`}
          </Typography>
          <Box className="flex  items-center gap-2">
            <Typography sx={{ marginBottom: "0.1rem" }}>Short by</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ height: 40 }}
              displayEmpty={false}
              onChange={(e) => mutate({ type: e.target.value })}
              defaultValue="All"
            >
              <MenuItem value="" disabled={true}>
                <em>Select sorting type</em>
              </MenuItem>
              <MenuItem value={"All"} selected={true}>
                All
              </MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"replied"}>Replied</MenuItem>
            </Select>
          </Box>
        </div>
        <TableContainer component={Paper} sx={{ marginBottom: "100px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>username</TableCell>
                <TableCell>Feedback</TableCell>
                <TableCell>Reply At</TableCell>
                <TableCell>Reply Message</TableCell>
                <TableCell>Reply to user</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student_rows?.map((row: funcData, index: number) => (
                <TableRow
                  key={row?.f_id + row?.p_id + row.r_time + row.f_time}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.f_time}</TableCell>
                  <TableCell>{row.f_status}</TableCell>
                  <TableCell>{row.p_uname}</TableCell>
                  <TableCell>{row.feedback}</TableCell>
                  <TableCell>
                    {row.r_time === null ? "not replied" : row.r_time}
                  </TableCell>
                  <TableCell>
                    {row.reply === null ? "not replied" : row.reply}
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={`reply ${row.p_uname}`}
                      arrow
                      placement="right"
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                          setIndexMeasure(index);
                        }}
                      >
                        <VscReply />
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default FeedBackTable;

function ButtonAnnotation({ row, index, setOpen, open, indexMeasure }: any) {
  return (
    <Modal
      open={indexMeasure === index ? open : false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // @ts-ignore
      key={row.f_id + index}
    >
      <Box sx={style}>
        {/*@ts-ignore */}
        <ReplyFeedBackModal
          setOpen={setOpen}
          feedbackID={row.f_id}
          user={row.p_uname}
        />
      </Box>
    </Modal>
  );
}
