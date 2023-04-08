// @ts-nocheck
import React from 'react';
import { Container } from '@mui/system';
import Navbar from '@/components/Navbar';
import { Card, Stack, Typography } from '@mui/material';
import Link from 'next/link';

const HomePage = () => {
    return (
        <>

            <Container className="mt-[13vh]">
                <Typography variant="h3" textAlign="center" className='text-slate-500' sx={{ margin: '1rem 0' }} >Services</Typography>
                <Stack direction="row" alignItems="center" flexWrap="wrap" justifyContent="center" gap={4} >
                    <Link href="/ConductorTable">
                        <Card className="Card w-[350px] transition-shadow hover:shadow-lg  h-[150px] bg-[#d90429] rounded-lg">
                            <Stack className="w-full h-full card-gradient p-[1px] rounded-[20px] shadow-card">
                                <div className='relative top-3 left-3' >
                                    <Typography className="text-white text-[1.8rem]" >Conductors</Typography>
                                </div>
                                <div className='relative top-3 right-3' >
                                </div>
                            </Stack>
                        </Card>
                    </Link>
                    <Link href="/UserTable">
                        <Card className="Card w-[350px] transition-shadow hover:shadow-lg  h-[150px] bg-[#0582ca] rounded-lg">
                            <Stack className="w-full h-full card-gradient p-[1px] rounded-[20px] shadow-card  "  >
                                <div className='relative top-3 left-3' >
                                    <Typography className="text-white text-[1.8rem]" >Users</Typography>
                                </div>
                                <div className="relative bottom-3 left-3">
                                </div>
                            </Stack>
                        </Card>
                    </Link>
                    <Link href="/BusStopsTable" >
                        <Card className="Card w-[350px] transition-shadow hover:shadow-lg  h-[150px] bg-[#fbb13c] rounded-lg">
                            <Stack className="w-full h-full card-gradient p-[1px] rounded-[20px] shadow-card  "  >
                                <div className='relative top-3 left-3' >
                                    <Typography className="text-white text-[1.8rem]" >Bus stops</Typography>
                                </div>
                            </Stack>
                        </Card>
                    </Link>
                    <Link href="/InvoicesTable" >
                        <Card className="Card w-[350px] transition-shadow hover:shadow-lg  h-[150px] bg-[#2c6e49] rounded-lg">
                            <Stack className="w-full h-full card-gradient p-[1px] rounded-[20px] shadow-card  "  >
                                <div className='relative top-3 left-3' >
                                    <Typography className="text-white text-[1.8rem]" >Invoices</Typography>
                                </div>
                            </Stack>
                        </Card>
                    </Link>
                    <Link href="/AdminTable" >
                        <Card className="Card w-[350px] transition-shadow hover:shadow-lg  h-[150px] bg-[#f77f00] rounded-lg">
                            <Stack className="w-full h-full card-gradient p-[1px] rounded-[20px] shadow-card  "  >
                                <div className='relative top-3 left-3' >
                                    <Typography className="text-white text-[1.8rem]" >Admins</Typography>
                                </div>
                            </Stack>
                        </Card>
                    </Link>
                </Stack>
            </Container>
        </>

    );
};

export default HomePage;