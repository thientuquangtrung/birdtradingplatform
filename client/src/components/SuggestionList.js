import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function SuggestionList({ data = [], setSuggestData, setProductName }) {
    return (
        <Paper sx={{ width: '100%' }}>
            <List>
                {data.length > 0 &&
                    data.map((suggestion, index) => (
                        <Link
                            to={`/shopping`}
                            state={{
                                q: suggestion,
                            }}
                            onClick={() => {
                                setProductName('');
                                setSuggestData([]);
                            }}
                        >
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={suggestion} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
            </List>
        </Paper>
    );
}

export default SuggestionList;
