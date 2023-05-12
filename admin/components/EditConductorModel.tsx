import React, { SyntheticEvent, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { profile_edit_textfield, modelAutocomplete } from '../styles';
import { toast } from 'react-hot-toast';
import isUserNameValid from '@/functions/userNameValidate';
import validateEmail from '@/functions/validateEmail';
import Spinner from './Spinner';

const EditConductor = ({ setOpen, initialValues }: any) => {
    const [loading, setLoading] = useState(false);

    const [conductor, setConductor] = useState({
        ...initialValues
    });

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (conductor.name === "" || conductor.uname === "" || conductor.email === "") {
            toast.error("Please enter all the required fields");
            return;
        }
        if (!isUserNameValid(conductor.uname)) {
            toast.error("Please enter valid username");
            return;
        }
        if (validateEmail(conductor.email) === null) {
            toast.error("please enter valid email format");
            return;
        }
        setLoading(true);
        const store: any = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/updateConductor`, {
            method: "PATCH",
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json',
                authToken: sessionStorage.getItem("admin")
            },
            body: JSON.stringify({
                c_id: conductor.id,
                c_uname: conductor.uname,
                c_name: conductor.name,
                c_email: conductor.email,
            }),
        });

        const res: any = await store.json();
        if (res.success) {
            toast.success("Conductor edited successfully");
            setOpen(false);
        } else if (!res.success) {
            toast.error(res.msg);
        }
        else {
            toast.error("Something went wrong");
        }
        setLoading(false);
    };
    return (
        <div>
            {loading && <Spinner message={`Editing conductor ${conductor?.name}`} />}

            <form onSubmit={handleSubmit} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update Conductor
                </Typography>
                <TextField
                    label="name"
                    sx={profile_edit_textfield}
                    variant="standard"
                    color="info"
                    type="text"
                    value={conductor.name}
                    onChange={(e) => {
                        setConductor({
                            ...conductor,
                            name: e.target.value
                        });
                    }}
                />
                <TextField
                    label="username"
                    sx={profile_edit_textfield}
                    variant="standard"
                    color="info"
                    type="text"
                    value={conductor.uname}
                    onChange={(e) => {
                        setConductor({
                            ...conductor,
                            uname: e.target.value
                        });
                    }}
                />

                <TextField
                    label="email"
                    sx={profile_edit_textfield}
                    variant="standard"
                    color="info"
                    type="email"
                    value={conductor.email}
                    onChange={(e) => {
                        setConductor({
                            ...conductor,
                            email: e.target.value
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
                        edit conductor
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default EditConductor;


