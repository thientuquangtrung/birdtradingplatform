import * as XLSX from 'xlsx';
import { Button } from '@mui/joy';
import DownloadIcon from '@mui/icons-material/Download';

function ExportExcel({ data }) {
    const handleExport = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'chart_data.xlsx');
    };
    return (
        <Button
            variant="soft"
            sx={{
                color: '#378d82',
                backgroundColor: '#d4ece7',
                '&:hover': {
                    backgroundColor: '#d4ece7',
                },
            }}
            startDecorator={<DownloadIcon />}
            onClick={handleExport}
        >
            Export to Excel
        </Button>
    );
}

export default ExportExcel;
