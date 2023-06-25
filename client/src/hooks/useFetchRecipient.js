import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.member.find((id) => id !== user?.id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            axiosClient
                .get(`auth/account/${recipientId}`, {
                    params: {
                        role: 'ALL',
                    },
                })
                .then((response) => {
                    setRecipientUser(response.data.data);
                })
                .catch((error) => {
                    setError(error);
                });
        };

        getUser();
    }, []);
    return { recipientUser };
};
