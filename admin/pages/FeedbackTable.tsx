import { useState, useEffect } from 'react';
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
import { AiOutlineDelete } from 'react-icons/ai';
import { VscReply } from 'react-icons/vsc';
import { style } from '../styles';
import { toast } from 'react-hot-toast';
import ReplyFeedBackModal from '@/components/ReplyFeedbackModal';
interface funcData {
    a_id?: string,
    f_id?: string,
    f_status?: string,
    f_time?: string,
    feedback?: string,
    p_id?: string,
    r_time?: string,
    reply?: string;
}

const FeedBackTabel = () => {
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [conductorModal, setConductorModal] = useState<boolean>(false);
    const [dataSet, setDataSet] = useState<Array<object>>([]);
    const [indexMeasure, setIndexMeasure] = useState<number>(0);
    useEffect(() => {
        fetchConductors();
    }, []);
    async function fetchConductors() {

        const conductors = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/fetchFeedback`, {
            method: "GET",
            //@ts-ignore
            headers: {
                'Content-type': 'application/json',
                authToken: sessionStorage.getItem('admin'),
            },
        });
        const res = await conductors.json();
        console.log(res);

        if (res.success) {
            setDataSet(res.feedbacks);
        }

    }
    const student_rows = dataSet.map((data: any) => (
        createData(
            data.a_id,
            data.f_id,
            data.f_status,
            data.f_time,
            data.feedback,
            data.p_id,
            data.r_time,
            data.reply,

        )
    ));

    function createData(a_id: string, f_id: string, f_status: string, f_time: string, feedback: string, p_id: string, r_time: string, reply: string): funcData {
        return {
            a_id,
            f_id,
            f_status,
            f_time,
            feedback,
            p_id,
            r_time,
            reply,
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
            <div className="mt-[16vh] px-5 p-4">
                <div className="flex justify-between items-center my-5 ">
                    <Typography variant="h4" className="text-slate-500">
                        User Feedbacks
                    </Typography>
                </div>
                <TableContainer component={Paper} sx={{ marginBottom: "100px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Feedback</TableCell>
                                <TableCell>Reply Message</TableCell>
                                <TableCell>Reply</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {student_rows?.map((row: any, index: number) => (
                                <TableRow
                                    key={row.f_id + row.p_id + row.r_time + row.f_time}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell>{row.f_time}</TableCell>
                                    <TableCell>{row.f_status}</TableCell>
                                    <TableCell>
                                        {row.feedback}
                                    </TableCell>
                                    <TableCell>
                                        {row.reply === null ? "not replied" : row.reply}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip
                                            title={`Reply ${row.p_id}`}
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

export default FeedBackTabel;



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
                <ReplyFeedBackModal setOpen={setOpen} feedbackID={row.f_id} user={row.p_id} />
            </Box>
        </Modal>
    );
}
