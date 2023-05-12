import React from 'react';
import { Bars, ThreeDots } from 'react-loader-spinner';

//@ts-ignore
const Spinner = ({ message }) => {
    return (
        <div className='absolute inset-0  z-20' style={{ backgroundColor: "rgba(0,0,0,0.5)" }} >
            <div className="flex flex-col justify-center items-center w-full h-full ">
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
        </div>
    );
};

export default Spinner;