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

function RevenueManagement() {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <Paper
                    elevation={2}
                    sx={{
                        padding: 2,
                    }}
                >
                    <Stack direction="row" gap={3} alignItems="center">
                        <CalendarMonthIcon />
                        <span style={{ fontSize: 20, marginLeft: -15 }}>Khung thời gian</span>
                        <DemoContainer components={['DateRangePicker']}></DemoContainer>
                        <DemoItem component="DateRangePicker">
                            <DateRangePicker defaultValue={[today, tomorrow]} disableFuture />
                        </DemoItem>
                    </Stack>
                </Paper>

                <Paper elevation={2} sx={{ padding: 5, marginTop: '30px', height: 'auto' }}>
                    <Stack>
                        <AreaChart
                            width={1000}
                            height={500}
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </Stack>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}

export default RevenueManagement;
