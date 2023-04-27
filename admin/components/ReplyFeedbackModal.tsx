import React, { SyntheticEvent, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { profile_edit_textfield, modelAutocomplete } from '../styles';
import { toast } from 'react-hot-toast';

const ReplyFeedBackModal = ({ setOpen, feedbackID, user }: any) => {
    console.log(feedbackID);

    const [feedback, setFeedback] = useState({
        f_id: feedbackID,
        reply: "",
    });
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (feedback.reply === "") {
            toast.error("Please enter reply.");
            return;
        }
        const create = await fetch(`${process.env.NEXT_PUBLIC_HOST}/feedback/createfeedback`, {
            method: "POST",
            //@ts-ignore
            headers: {
                "Content-Type": "application/json",
                authToken: sessionStorage.getItem('feedback')?.toString(),
            },
            body: JSON.stringify(feedback)
        });
        const response = await create.json();
        if (response.success) {
            toast.success("Successfully created a new feedback");
            setOpen(false);
        } else if (!response.success) {
            toast.error(response.msg);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <Typography id="modal-modal-title" align="center" variant="h6" component="h2">
                    Reply   <b> {user}</b>
                </Typography>
                <TextField
                    label="message"
                    sx={profile_edit_textfield}
                    placeholder="Enter your message"
                    variant="outlined"
                    rows={4}
                    multiline
                    color="info"
                    type="text"
                    value={feedback.reply}
                    onChange={(e) => {
                        setFeedback({
                            ...feedback,
                            reply: e.target.value
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
                        Reply {user}
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default ReplyFeedBackModal;