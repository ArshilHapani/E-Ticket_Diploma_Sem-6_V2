"use client";

import { IconButton } from "@mui/material";
import { Tooltip, Modal } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { BsPersonAdd } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

import CreateConductorModel from "./CreateConductorModel";
import AddStationsModel from "./AddStationsModel";
import AddAdmins from "./AddAdminsModal";

const style = {
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

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [addTicketModel, setAddTicketModel] = useState<boolean>(false);
  const [addAdminModal, setAddAdminModal] = useState<boolean>(false);
  return (
    <Stack
      direction="row"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        width: "100vw",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
      }}
      justifyContent="space-between"
      alignItems="center"
      className="shadow-md z-10 h-[70px]"
    >
      <Stack direction="row" gap={4} alignItems="center" className="px-4">
        <div className="cursor-pointer">
          <Link
            href="/HomePage"
            className="focus:outline-none pointer-events-none"
          >
            <Image
              src="/svg/logo-no-background.svg"
              alt="logo"
              height={60}
              width={60}
              className="pointer-events-none"
            />
          </Link>
        </div>
        <Tooltip title="Profile" placement="bottom" arrow>
          <IconButton color="primary" onClick={() => router.push("/Profile")}>
            <AiOutlineUser />
          </IconButton>
        </Tooltip>
        <Tooltip title="Insights" placement="bottom" arrow>
          <IconButton
            color="primary"
            onClick={() => router.push("/StatisTics")}
          >
            <GoGraph />
          </IconButton>
        </Tooltip>
      </Stack>
      <Box className="px-4 flex gap-4 ">
        <Tooltip title="Add stations" placement="bottom" arrow>
          <IconButton color="primary" onClick={() => setAddTicketModel(true)}>
            <MdOutlineAddLocationAlt />
          </IconButton>
        </Tooltip>
        <Modal
          open={addTicketModel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddStationsModel setOpen={setAddTicketModel} />
          </Box>
        </Modal>
        <Tooltip title="Add admin" placement="bottom" arrow>
          <IconButton color="primary" onClick={() => setAddAdminModal(true)}>
            <RiAdminLine />
          </IconButton>
        </Tooltip>
        <Modal
          open={addAdminModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddAdmins setOpen={setAddAdminModal} />
          </Box>
        </Modal>
        <Tooltip title="Add Conductor" placement="bottom" arrow>
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <BsPersonAdd />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateConductorModel setOpen={setOpen} />
          </Box>
        </Modal>
      </Box>
    </Stack>
  );
};

export default Navbar;
