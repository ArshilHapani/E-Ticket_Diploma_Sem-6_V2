import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
const style = {
    zIndex: 999999999999,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    loaderStyle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};
//@ts-ignore
const Spinner = ({ message }) => {
    return (
        <Box sx={style}>
            <div className="flex flex-col overflow-hidden justify-center items-center w-screen h-screen ">
                <ThreeDots
                    height="50"
                    width="50"
                    color="#edf6f9"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
                <p className="text-lg py-3 text-center px-2 text-[#edf6f9] font-bold ">{message}</p>
            </div>
        </Box>
    );
};

export default Spinner;