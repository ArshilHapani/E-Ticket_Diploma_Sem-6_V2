import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Button, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/Spinner';


const BroadCastEmail = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (value: string) => {
        setText(value);
    };
    async function broadCastMessageFetchToBackendRequestHandler() {
        if (text === "") {
            toast.error("Please enter message");
            return;
        }
        setLoading(true);
        const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/admin/sendEmails`, {
            method: 'POST',
            //@ts-ignore
            headers: {
                "Content-Type": "application/json",
                authToken: sessionStorage.getItem("admin"),
            },
            body: JSON.stringify({
                message: text,
            })
        });

        const res = await req.json();
        if (res.success) {
            toast.success("Message is broadcasted to all the users");
        }
        else if (res.msg) {
            toast.error(res.msg);
        }
        else {
            toast.error("Failed to broadcast message");
        } setLoading(false);
    }
    return (
        <>
            {loading && <Spinner message="Sending Broadcast" />}
            <div className='h-screen p-10 w-full ' >
                <Typography variant="h4" className="text-center my-10" >Send message to all the users</Typography>

                <div className='h-[60%]'>
                    <ReactQuill
                        value={text}
                        onChange={handleChange}
                        placeholder='Enter a message'
                        style={{ height: "80%" }}
                    />
                </div>
                <div className='d-flex w-full  items-end justify-end' >
                    <Button variant="outlined" onClick={broadCastMessageFetchToBackendRequestHandler} color="success">Broadcast</Button>
                </div>
            </div>
        </>
    );
};

export default BroadCastEmail;