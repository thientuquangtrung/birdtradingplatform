import * as React from 'react';
import { Stack } from '@mui/system';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AreaChart, Tooltip, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState, useEffect, useContext } from 'react';
import axiosClient from '../../api/axiosClient';
import AuthContext from '../../contexts/AuthContext';
import handleError from '../../utils/handleError';
import ExportExcel from '../../components/ExportExcel';

function RevenueManagement() {
    const today = dayjs();
    const yesterday = dayjs().add(-1, 'day');
    const [data, setData] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [value, setValue] = useState([yesterday, today]);

    useEffect(() => {
        axiosClient
            .get(`seller/revenue/${currentUser.id}`, {
                params: {
                    startDate: value[0].format('YYYY/MM/DD'),
                    endDate: value[1].format('YYYY/MM/DD'),
                },
            })
            .then(function (response) {
                // handle success
                setData(response.data.data);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }, [value]);

    function handleSelectDate(newValue) {
        setValue(newValue);
    }

    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <Paper
                    elevation={2}
                    sx={{
                        padding: 3,
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" gap={2} alignItems="center">
                            <CalendarMonthIcon />
                            <span style={{ fontSize: 20, marginLeft: -7 }}>Khung thời gian</span>
                            <DemoContainer components={['DateRangePicker']}></DemoContainer>
                            <DemoItem component="DateRangePicker">
                                <DateRangePicker
                                    defaultValue={[yesterday, today]}
                                    disableFuture
                                    value={value}
                                    onChange={handleSelectDate}
                                />
                            </DemoItem>
                        </Stack>
                        <ExportExcel data={data} />
                    </Stack>
                </Paper>

                <Paper elevation={2} sx={{ padding: 3, marginTop: '30px', height: 'auto' }}>
                    <Stack fontSize={16}>
                        <AreaChart width={1000} height={500} data={data}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient> */}
                            </defs>
                            <XAxis dataKey="label" />
                            <YAxis type="number" domain={[0, 'dataMax']} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </Stack>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}

export default RevenueManagement;
