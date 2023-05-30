import Paper from '@mui/material/Paper';


function Message({ own, data }) {
    const style = {
        backgroundColor: '#f5f5f5',
        alignSelf: 'self-start',
    };
    if (own) {
        style.backgroundColor = '#e1f5fe';
        style.alignSelf = 'end';
    }
    return (
        <Paper
            variant="outlined"
            sx={{
                fontSize: 14,
                padding: '3px',
                width: 'fit-content',
                maxWidth: '150px',
                wordBreak: 'break-all',
                ...style,
            }}
        >
            Helloooooooooooooooooo
        </Paper>
    );
}

export default Message;
