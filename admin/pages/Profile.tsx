"use client";

//@ts-nocheck

import {
  Avatar,
  Button,
  Divider,
  Modal,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import EditProfileModel from "../components/EditProfileModal";
import b64Convertor from "../functions/b64Convertor";
import compressImage from "../functions/compressImage";
import Spinner from "@/components/Spinner";
import { fetchAdminProfile } from "@/functions/api/dataFetchers";

const labelStyle = {
  color: "#8d99ae",
  fontSize: 15,
  fontFamily: "Actor",
};
const userDetailsStyle = {
  fontSize: 19,
  color: "#2b2d42",
};

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [localObj, setLocalObj] = useState({
    a_id: "",
    a_uname: "",
    created_by: "",
    a_name: "",
    a_email: "",
    a_no: "",
    a_dob: "",
    a_img: "",
  });
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["profile", "admin"],
    queryFn: fetchAdminProfile,
    onSuccess(data) {
      if (data?.success) {
        setLocalObj({ ...data.admin });
      } else if (data?.error) {
        toast.error(data.error);
      } else if (data?.status) {
        toast.error(data.status);
      } else {
        toast.error("Failed to update profile");
      }
    },
    refetchInterval: 3000,
  });

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    //@ts-ignore
    const selectedFile = e?.target?.files[0];
    if (
      selectedFile.type !== "image/jpeg" &&
      selectedFile.type !== "image/png" &&
      selectedFile.type !== "image/svg" &&
      selectedFile.type !== "image/jpg"
    ) {
      toast.error("Please upload an image with valid format");
      setLoading(false);
      return;
    }
    if (selectedFile.size >= 800000) {
      const imageRes = await compressImage(selectedFile);
      //@ts-ignore
      await b64Convertor(imageRes);
      toast.success("Image updated successfully");
      setLoading(false);
      return;
    }
    await b64Convertor(selectedFile);
    toast.success("Image updated successfully");
    setLoading(false);
  };
  if (isLoading) <Spinner message={`fetching... `} />;
  if (loading) <Spinner message={`Updating latest data... `} />;
  return (
    <>
      <Stack
        sx={{
          height: "100vh",
          width: "100vw",
          transition: "all 0.2s ease-in-out",
          marginTop: {
            sm: "5rem",
            md: "3rem",
          },
          overflowX: "hidden",
        }}
        direction="column"
        justifyContent={{
          sm: "flex-start",
          xs: "flex-start",
          md: "center",
          lg: "center",
        }}
        alignItems="center"
      >
        <Stack
          direction={{
            md: "row",
            lg: "row",
            xs: "column",
            sm: "column",
          }}
          justifyContent="center"
          width={{
            xs: "96%",
            sm: "96%",
            md: "80%",
            lg: "50%",
          }}
          height={{
            md: "80%",
            lg: "70%",
          }}
          sx={{
            "&:hover": {
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            },
            borderRadius: "8px",
            padding: "5rem 1rem ",
          }}
          gap={10}
          alignItems="center"
        >
          <Stack
            direction="column"
            gap={2}
            justifyContent="center"
            alignItems="center"
            width="40%"
          >
            <Avatar
              src={localObj?.a_img}
              sx={{ width: 70, height: 70 }}
              alt={localObj?.a_name}
            >
              {localObj?.a_uname?.charAt(0)}
            </Avatar>
            <Button
              variant="outlined"
              component="label"
              endIcon={<MdPhotoCamera />}
              sx={{
                width: "180px",
              }}
            >
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={uploadImage}
              />
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "180px",
              }}
              component="label"
              endIcon={<AiFillEdit />}
              onClick={() => setProfileModal(true)}
            >
              Edit profile
            </Button>
            <Modal open={profileModal}>
              <Box>
                <EditProfileModel
                  initialValues={localObj}
                  closeModal={setProfileModal}
                />
              </Box>
            </Modal>
          </Stack>
          <Stack width="60%" gap={1}>
            {isError && `Error fetching profile '${error}'`}
            <Typography sx={labelStyle}>Name</Typography>
            <Typography sx={userDetailsStyle}>{localObj.a_name}</Typography>
            <Divider />
            <Typography sx={labelStyle}>username</Typography>
            <Typography sx={userDetailsStyle}>{localObj?.a_uname}</Typography>
            <Divider />
            <Typography sx={labelStyle}>email</Typography>
            <Typography sx={userDetailsStyle}>{localObj?.a_email}</Typography>
            <Divider />
            <Typography sx={labelStyle}>mobile</Typography>
            <Typography sx={userDetailsStyle}>
              {localObj?.a_no === null
                ? "No mobile number added"
                : localObj.a_no}
            </Typography>
            <Divider />
            <Typography sx={labelStyle}>Date of Birth</Typography>
            <Typography sx={userDetailsStyle}>{localObj?.a_dob}</Typography>
            <Divider />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Profile;
