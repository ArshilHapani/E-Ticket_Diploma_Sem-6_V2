import React, { SyntheticEvent, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { profile_edit_textfield, modelAutocomplete } from '../styles';
import { toast } from 'react-hot-toast';
import isUserNameValid from '@/functions/userNameValidate';
import validateEmail from '@/functions/validateEmail';
import Spinner from './Spinner';

const EditAdmin = ({ setOpen, initialValues }: any) => {
    const [loading, setLoading] = useState(false);

    const [admin, setAdmin] = useState({
        ...initialValues
    });

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (admin.name === "" || admin.uname === "" || admin.email === "" || admin.mobile === "") {
            toast.error("Please enter all the required fields");
            return;
        }
        if (!isUserNameValid(admin.uname)) {
            toast.error("Please enter valid username");
            return;
        }
        if (validateEmail(admin.email) === null) {
            toast.error("please enter valid email format");
            return;
        }
        if (admin.mobile.length !== 10) {
            toast.error("The length of mobile number must be equal to 10");
            return;
        }
        setLoading(true);
        const store: any = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/updateAdmin`, {
            method: "PATCH",
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json',
                authToken: sessionStorage.getItem("admin")
            },
            body: JSON.stringify({
                a_id: admin.id,
                a_uname: admin.uname,
                a_name: admin.name,
                a_email: admin.email,
                a_no: admin.mobile,
            }),
        });

        const res: any = await store.json();

        if (res.success) {
            toast.success("admin edited successfully");
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
            {loading && <Spinner message={`Editing admin ${admin?.name}`} />}

            <form onSubmit={handleSubmit} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update Admin
                </Typography>
                <TextField
                    label="name"
                    sx={profile_edit_textfield}
                    variant="standard"
                    color="info"
                    type="text"
                    value={admin.name}
                    onChange={(e) => {
                        setAdmin({
                            ...admin,
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
                    value={admin.uname}
                    onChange={(e) => {
                        setAdmin({
                            ...admin,
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
                    value={admin.email}
                    onChange={(e) => {
                        setAdmin({
                            ...admin,
                            email: e.target.value
                        });
                    }}
                />
                <TextField
                    label="number"
                    sx={profile_edit_textfield}
                    variant="standard"
                    color="info"
                    type="number"
                    value={admin.mobile}
                    onChange={(e) => {
                        setAdmin({
                            ...admin,
                            mobile: e.target.value
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
                        edit admin
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default EditAdmin;


