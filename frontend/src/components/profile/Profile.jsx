import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Divider, Modal, Typography } from "@mui/material";
import { MdPhotoCamera } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Stack } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

import "./Profile.scss";
import { useStateContext } from "../../context/stateContext";
import useMuiStyles from "../../hooks/useMuiStyles";
import UpdateProfileModel from "./UpdateProfileModel";
import calculateAge from "../../functions/agrCalculate";
import isUserNameValid from "../../functions/userNameValidate";
import b64Convertor from "../../functions/b64Convertor";
import { compressImage, validateEmail } from "../../functions";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../states/slices/userSlice";
import useUserFetch from "../../hooks/useUserFetch";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchUser } = useUserFetch();
  if (
    (localStorage.getItem("user") === null) |
    (localStorage.getItem("user") === undefined) |
    (localStorage.getItem("user") === "")
  ) {
    navigate("/signUp");
  }
  const { id } = useParams();
  document.title = `E-Ticket | Profile - ${id}`;
  const {
    theme,
    setBuyTicketModel,
    showSnackBar,
    newUser,
    setLoader,
    setNewUser,
    toggleSync,
  } = useStateContext();
  const { detail_ref_style, profile_divider_styles } = useMuiStyles();
  const [open, setOpen] = useState(false);
  const [reduxUserState, setReduxUserState] = useState(null);
  const { user } = useSelector(selectUser);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    name: user?.p_name,
    uname: user?.p_uname,
    email: user?.p_email,
    no: user?.p_no,
  });
  console.log(reduxUserState);
  useEffect(() => {
    (async () => {
      await fetchUser();
      // user.p_name === "" && navigate("/");
      setReduxUserState(user);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNewUser, toggleSync]);
  const uploadImage = async (e) => {
    e.preventDefault();
    setLoader(true);
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type !== "image/jpeg" &&
      selectedFile.type !== "image/png" &&
      selectedFile.type !== "image/svg" &&
      selectedFile.type !== "image/jpg"
    ) {
      showSnackBar("Please upload an image with valid format", "error");
      setLoader(false);
      return;
    }
    if (selectedFile.size >= 800000) {
      const imageRes = await compressImage(selectedFile);
      await b64Convertor(imageRes, showSnackBar, fetchUsers);
      showSnackBar("Image updated successfully", "success");
      setLoader(false);
      return;
    }
    await b64Convertor(selectedFile, showSnackBar, fetchUsers);
    showSnackBar("Image updated successfully", "success");
    setTimeout(() => {
      fetchUsers();
    }, 1000);
    setLoader(false);
  };
  const handleForm = (e) => {
    e.preventDefault();
    if (
      (updatedUserInfo.name === "") |
      (updatedUserInfo.email === "") |
      (updatedUserInfo.uname === "")
    ) {
      showSnackBar("Please fill all the required fields", "error");
      return;
    }
    if (updatedUserInfo.no !== "" && updatedUserInfo?.no?.length !== 10) {
      showSnackBar("Length of mobile number must be of 10", "error");
      return;
    }
    if (!isUserNameValid(updatedUserInfo.uname)) {
      showSnackBar("Please enter valid username", "error");
      return;
    }
    if (validateEmail(updatedUserInfo.email) === null) {
      showSnackBar("please enter valid email format", "error");
      return;
    }
    setLoader(true);
    if (updateProfile(updatedUserInfo)) {
      setOpen(false);
      showSnackBar("Profile updated", "success");
      setLoader(false);
    } else {
      showSnackBar("something went wrong", "error");
      setLoader(false);
    }
  };

  async function updateProfile(updateData) {
    setLoader(true);
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND}/passenger/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("user").toString(),
        },
        body: JSON.stringify({
          p_uname: updateData.uname,
          p_name: updateData.name,
          p_email: updateData.email,
          p_no: updateData.no,
        }),
      }
    );

    const response = await data.json();
    const { success } = response;
    fetchUsers();
    fetchUser();
    setLoader(false);
    return success;
  }

  // Fetching data after being updated
  async function fetchUsers() {
    setLoader(true);
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND}/passenger/fetch`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("user").toString(),
        },
      }
    );
    const response = await data.json();
    const { passenger } = response;
    dispatch(
      setUser({
        ...passenger,
      })
    );
    setNewUser(passenger);
    setLoader(false);
  }

  return (
    <Box
      className={`user-profile-container ${
        theme === "light" ? "light" : "dark"
      }`}
    >
      <div
        className={`profile-header-section  ${
          theme === "light" ? "light" : "dark"
        }`}
      >
        <Box className="profile-hero-section dark">
          <Avatar
            src={reduxUserState?.p_img}
            sx={{
              width: 90,
              height: 90,
              fontSize: 50,
            }}
            className="img-avatar"
            alt="profile-picture"
          >
            {reduxUserState?.p_name?.charAt(0)}
          </Avatar>
          <Button
            variant="outlined"
            component="label"
            startIcon={<MdPhotoCamera />}
            color="info"
          >
            Upload image
            <input hidden type="file" accept="image/*" onChange={uploadImage} />
          </Button>
        </Box>
        <div className="profile-credentials-container">
          <Typography sx={detail_ref_style}>name</Typography>
          <Typography sx={detail_ref_style.userDetailStyle}>
            {reduxUserState?.p_name}
          </Typography>
          <Divider sx={profile_divider_styles} />
          <Typography sx={detail_ref_style}>username</Typography>
          <Typography sx={detail_ref_style.userDetailStyle}>
            {reduxUserState?.p_uname}
          </Typography>
          <Divider sx={profile_divider_styles} />

          <Typography sx={detail_ref_style}>email</Typography>
          <Typography sx={detail_ref_style.userDetailStyle}>
            {reduxUserState?.p_email}
          </Typography>
          <Divider sx={profile_divider_styles} />

          <Typography sx={detail_ref_style}>mobile number</Typography>
          <Typography sx={detail_ref_style.userDetailStyle}>
            {reduxUserState?.p_no
              ? reduxUserState.p_no
              : "no mobile number added"}
          </Typography>
          <Divider sx={profile_divider_styles} />
          <Typography sx={detail_ref_style}>Date Of Birth</Typography>
          <Typography sx={detail_ref_style.userDetailStyle}>
            {reduxUserState?.p_dob}
          </Typography>
          <Divider sx={profile_divider_styles} />
          <Typography sx={detail_ref_style}>age</Typography>
          <Typography sx={detail_ref_style.userDetailStyle}>
            {calculateAge(reduxUserState?.p_dob) || 0}
          </Typography>

          <Divider sx={profile_divider_styles} />
          <Button
            variant="outlined"
            sx={{ margin: ".5rem 0" }}
            component="label"
            startIcon={<AiFillEdit />}
            color="info"
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </Button>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={handleForm}>
              <UpdateProfileModel
                updatedUserInfo={updatedUserInfo}
                setUpdatedUserInfo={setUpdatedUserInfo}
                setOpen={() => {
                  setOpen(); //TODO fixing update profile bug
                }}
              />
            </form>
          </Modal>
        </div>
        <div className="user-non-req-details">
          <Typography sx={detail_ref_style}>
            Total number of ticket generated
          </Typography>
          <Typography sx={detail_ref_style.userDetailStyle}>
            {reduxUserState?.no_ticket}
          </Typography>
          <Divider sx={profile_divider_styles} />
          <Stack direction="column" gap={1}>
            <Button variant="outlined" onClick={() => navigate("/tickets")}>
              View active tickets
            </Button>
            <Button variant="outlined" onClick={() => setBuyTicketModel(true)}>
              Buy Ticket
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                navigate("/signIn");
              }}
              endIcon={<FiLogOut />}
            >
              Log out
            </Button>
          </Stack>
        </div>
      </div>
    </Box>
  );
};

export default Profile;
