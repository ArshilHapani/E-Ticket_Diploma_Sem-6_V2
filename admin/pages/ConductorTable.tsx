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
import { AiOutlineBulb, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { SiMicrosoftexcel } from "react-icons/si";
import EditConductor from '@/components/EditConductorModel';
import { style } from '../styles';
import { toast } from 'react-hot-toast';
import CreateConductorModel from '@/components/CreateConductorModel';
import { handleDownloadConductorSampleExcel, readConductorExcel } from '@/functions/readAndUploadExcel';
import Spinner from '@/components/Spinner';
interface funcData {
    img: string,
    id: string,
    name: string,
    uname: string,
    email: string,
    mobile: string,
    dob: string,
}

const ConductorTable = () => {
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [conductorModal, setConductorModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSet, setDataSet] = useState<Array<object>>([]);
    const [indexMeasure, setIndexMeasure] = useState<number>(0);
    useEffect(() => {
        fetchConductors();
    }, []);
    async function fetchConductors() {
        setLoading(true);
        const conductors = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllConductors`, {
            method: "GET",
            //@ts-ignore
            headers: {
                'Content-type': 'application/json',
                authToken: sessionStorage.getItem('admin'),
            },
        });
        const res = await conductors.json();

        if (res.success) {
            setDataSet(res.conductors);
        }
        setLoading(false);

    }
    const student_rows = dataSet.map((data: any) => (
        createData(
            data.c_img,
            data.c_id,
            data.c_name,
            data.c_uname,
            data.c_email,
            data.c_no,
            data.c_dob,
        )
    ));

    function createData(img: string, id: string, name: string, uname: string, email: string, mobile: string, dob: string): funcData {
        return {
            img, id, name, uname, email, mobile, dob
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
            {loading && <Spinner message="Updating..." />}
            <div className="mt-[16vh] px-5 p-4">
                <div className="flex-col sm:flex-row justify-between  md:items-center items-start gap-3 my-5 flex">
                    <Typography variant="h4" className="text-slate-500">
                        Manage Conductors
                    </Typography>
                    <div className="flex gap-4">
                        <Button variant="outlined" onClick={() => setConductorModal(true)} >Add Conductor</Button>
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
                                onChange={(e) => readConductorExcel(e, setLoading)} />
                        </Button>
                        <Tooltip title="Download sample excel file" placement="bottom" >
                            <IconButton color="success" onClick={handleDownloadConductorSampleExcel} >
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
                                                row?.img !== null &&
                                                    typeof row?.img === "string" ?
                                                    row?.img : " "
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
                                        <Tooltip
                                            title={`Edit ${row.name}`}
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

function OpenDialogModal({ open, setOpen, uname, index, indexMeasure }: dialogModel) {
    async function handleDelete() {
        const deleteConductor = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/deleteConductor`, {
            method: 'DELETE',
            //@ts-ignore
            headers: {
                'Content-type': 'application/json',
                authToken: sessionStorage.getItem('admin')
            },
            body: JSON.stringify({
                c_uname: uname
            })
        });
        const res = await deleteConductor.json();
        if (res.success) {
            toast.success(`${uname} deleted successfully`);
            setOpen(false);
        }
        else if (!res.success) {
            toast.error(res.msg);
        }
        else {
            toast.error("Failed to delete conductor");
        }
    }
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
                <Button onClick={() => setOpen(false)} color="error" variant="outlined" >Disagree</Button>
                <Button onClick={handleDelete} color="success" variant="outlined"  >
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
