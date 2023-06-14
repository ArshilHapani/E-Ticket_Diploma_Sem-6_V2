"use client";

import React, { useMemo, useState } from "react";
import { Button, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import Spinner from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { broadCastMessage } from "@/functions/api/dataPosters";

const BroadCastEmail = () => {
  const [text, setText] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: (value: string) => broadCastMessage(value),
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success("Message is broadcasted to all the users");
      } else if (res.msg) {
        toast.error(res.msg);
      } else {
        toast.error("Failed to broadcast message");
      }
    },
  });

  const handleChange = (value: string) => {
    setText(value);
  };
  async function broadCastMessageSubmitHandler() {
    if (text === "") {
      toast.error("Please enter message");
      return;
    }
    mutate(text);
  }
  if (isError) toast.error(`Error while sending broadcast '${error}'`);
  return (
    <>
      {isLoading && <Spinner message="Sending Broadcast" />}
      <div className="h-screen p-10 w-full ">
        <Typography variant="h4" className="text-center my-10">
          Send message to all the users
        </Typography>

        <div className="h-[60%]">
          <ReactQuill
            value={text}
            onChange={handleChange}
            placeholder="Enter a message"
            style={{ height: "80%" }}
          />
        </div>
        <div className="d-flex w-full  items-end justify-end">
          <Button
            variant="outlined"
            onClick={broadCastMessageSubmitHandler}
            color="success"
          >
            Broadcast
          </Button>
        </div>
      </div>
    </>
  );
};

export default BroadCastEmail;
