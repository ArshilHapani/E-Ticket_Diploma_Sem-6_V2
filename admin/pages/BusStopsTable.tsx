import { useState, useEffect } from 'react';
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
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Navbar from '@/components/Navbar';
import { style } from '../styles';
import EditStations from '@/components/EditStations';
import { toast } from 'react-hot-toast';

interface funcData {
    id: number,
    name: string,
    latitude: number,
    longitude: number;
}

const BusStopsTable = () => {
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [dataSet, setDataSet] = useState<Array<object>>([]);
    const [indexMeasure, setIndexMeasure] = useState<number>(0);
    useEffect(() => {
        fetchConductors();
    }, []);
    async function fetchConductors() {
        const passenger = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllStations`, {
            method: "GET",
            //@ts-ignore
            headers: {
                'Content-type': 'application/json',
                authToken: sessionStorage.getItem('admin'),
            },
        });
        const res = await passenger.json();
        console.log(res);

        if (res.success) {
            setDataSet(res.stations);
        }

    }
    const student_rows = dataSet.map((data: any) => (
        createData(
            data.st_id,
            data.st_name,
            data.st_lat,
            data.st_long,
        )
    ));

    function createData(id: number, name: string, latitude: number, longitude: number): funcData {
        return {
            id, name, latitude, longitude
        };
    }



    return (
        <>
            <Navbar />
            <div className='mt-[16vh] px-5 p-4' >
                <Typography variant='h4' className="my-5 text-slate-500 " >All Bus stops</Typography>
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
                                        <Tooltip title={`Edit ${row.name}`} arrow placement='right' >
                                            <IconButton color="primary" onClick={() => { setOpen(true); setIndexMeasure(index); }}>
                                                <AiOutlineEdit />
                                            </IconButton>
                                        </Tooltip>
                                        <ButtonAnnotation open={open} indexMeasure={indexMeasure} row={row} index={index} setOpen={setOpen} />
                                    </TableCell>
                                    <TableCell>
                                        <>
                                            <Tooltip title={`Delete ${row.name}`} arrow placement='right' >
                                                <IconButton color="error" onClick={() => { setConfirmDialog(true); setIndexMeasure(index); }} >
                                                    <AiOutlineDelete />
                                                </IconButton>
                                            </Tooltip>
                                            <OpenDialogModal st_id={row.id} name={row.name} index={index} indexMeasure={indexMeasure} open={confirmDialog} setOpen={setConfirmDialog} />
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

function OpenDialogModal({ open, setOpen, st_id, name, indexMeasure, index }: dialogModel) {
    async function handleDelete() {
        const deleteConductor = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/deleteStation`, {
            method: 'DELETE',
            //@ts-ignore
            headers: {
                'Content-type': 'application/json',
                authToken: sessionStorage.getItem('admin')
            },
            body: JSON.stringify({ st_id })
        });
        const res = await deleteConductor.json();
        if (res.success) {
            toast.success(`${name} deleted successfully`);
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
                Are you sure? that you want to delete <b>{name}</b>
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
