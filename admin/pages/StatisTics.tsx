//@ts-nocheck
import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Container, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import { fetchPaymentsData } from '@/functions/fetchPaymentsData.';
import { fetchTicketDetails } from '@/functions/fetchTicketDetails';
import { fetchTicketCount } from '@/functions/fetchTicketCount';
import fetchUserCounts from '@/functions/fetchUserCounts';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            text: 'Recharge Collection and Tickets Revenue',
        },
    },
};
const options1 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            text: 'Number of ticket generated',
        },
    },
};
const options3 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            text: 'Number of users',
        },
    },
};


const StatisTics = () => {
    const [payments, setPayments] = useState<object>({ dates: [], payments: [] });
    const [counts, setCounts] = useState<object>({});
    const [tickets, setTickets] = useState<Array<number>>();
    const [ticketCount, setTicketCount] = useState<number>(0);
    useEffect(() => {
        fetchPaymentsData(setPayments, payments);
        fetchTicketDetails(setTickets);
        fetchTicketCount(setTicketCount);
        fetchCounts();
    }, []);
    async function fetchCounts() {
        const countsInitial = await fetchUserCounts();
        setCounts(countsInitial);
    }
    const labels = payments.dates;
    const data1 = {
        labels,
        datasets: [
            {
                label: 'tickets generated',
                data: ticketCount,
                backgroundColor: '#339989'
            }
        ]
    };
    const data = {
        labels,
        datasets: [
            {
                label: "collections in ₹",
                data: payments.payments,
                backgroundColor: 'rgba(0, 99, 232, 0.5)',
            },
            {
                label: "total tickets generated in ₹",
                data: tickets,
                backgroundColor: 'rgba(255, 9, 2, 0.5)',
            }
        ],
    };
    const userData = {
        labels: [
            'users',
            'conductors',
            'admins'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [counts.passengerCnt, counts.conductorCnt, counts.adminCnt],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    return (
        <>
            <Navbar />
            <Container className="mt-[13vh]">
                <Typography variant="h4" textAlign="center" sx={{ margin: '1rem 0' }} >Analysis</Typography>
                <div className='flex flex-wrap my-5 justify-center items-center' >
                    <div className='w-[70vw] h-[100vh] '>
                        <Bar options={options} data={data} />
                    </div>
                    <div className='w-[70vw] h-[100vh] '>
                        <Bar options={options1} data={data1} />
                    </div>
                    <div className='w-[30vw] mt-[-5vh] '>
                        <Pie options={options3} data={userData} />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default StatisTics;