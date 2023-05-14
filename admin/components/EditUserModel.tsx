import React, { SyntheticEvent, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { profile_edit_textfield, modelAutocomplete } from '../styles';
import { functionEditUserModelProps } from '@/interfaces';
import { toast } from 'react-hot-toast';
import isUserNameValid from '@/functions/userNameValidate';
import validateEmail from '@/functions/validateEmail';
import Spinner from './Spinner';

const EditUser = ({ setOpen, initialValues }: functionEditUserModelProps) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        ...initialValues
    });

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (user.name === null || user.uname === null || user.email === null || user.balance === null) {
            toast.error("Please enter all the required fields");
            return;
        }
        if (!isUserNameValid(user.uname)) {
            toast.error("Please enter valid username");
            return;
        }
        if (validateEmail(user.email) === null) {
            toast.error("please enter valid email format");
            return;
        }
        setLoading(true);
        const store: any = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/passenger/update`, {
            method: "PATCH",
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json',
                authToken: sessionStorage.getItem("admin")
            },
            body: JSON.stringify({
                p_id: user.id,
                p_uname: user.uname,
                p_email: user.email,
                p_name: user.name,
                p_balance: user.balance,
            }),
        });

        const res: any = await store.json();

        if (res.success) {
            toast.success("user edited successfully");
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

        <form onSubmit={handleSubmit} >
            {loading && <Spinner message={`Editing user ${user?.name}`} />}

            <Typography id="modal-modal-title" variant="h6" component="h2">
                Manage User
            </Typography>
            <TextField
                label="name"
                sx={profile_edit_textfield}
                variant="standard"
                color="info"
                type="text"
                value={user.name || ""}
                onChange={(e) => {
                    setUser({
                        ...user,
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
                value={user.uname || ""}
                onChange={(e) => {
                    setUser({
                        ...user,
                        uname: e.target.value
                    });
                }}
            />

            <TextField
                label="email"
                sx={profile_edit_textfield}
                variant="standard"
                color="info"
                type="text0"
                value={user.email || ""}
                onChange={(e) => {
                    setUser({
                        ...user,
                        email: e.target.value
                    });
                }}
            />
            <TextField
                label="balance"
                sx={profile_edit_textfield}
                variant="standard"
                color="info"
                type="number"
                value={user.balance || 0}
                onChange={(e) => {
                    setUser({
                        ...user,
                        balance: parseFloat(e.target.value)
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
                    edit user
                </Button>
            </Box>
        </form>
    );
};

export default EditUser;