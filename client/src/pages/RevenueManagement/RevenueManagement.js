import { Stack } from '@mui/system';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function RevenueManagement() {
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
                        <span style={{ fontSize: 20, marginLeft: -15}}>Khung thời gian</span>
                        <DemoContainer components={['DateRangePicker']}></DemoContainer>
                        <DemoItem component="DateRangePicker">
                            <DateRangePicker defaultValue={[today, tomorrow]} disableFuture />
                        </DemoItem>
                    </Stack>
                </Paper>

                <Paper elevation={2} sx={{ padding: 1, marginTop: '30px', height: '400px' }}>
                    <Stack></Stack>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}

export default RevenueManagement;
