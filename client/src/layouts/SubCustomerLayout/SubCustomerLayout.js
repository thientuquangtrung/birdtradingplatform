import { Stack } from '@mui/material';
import CustomerSidebar from '../../components/CustomerSidebar';

function SubCustomerLayout({ children }) {
    return (
        <Stack direction={'row'} gap={2}>
            <CustomerSidebar />
            {children}
        </Stack>
    );
}

export default SubCustomerLayout;
