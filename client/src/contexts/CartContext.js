import PropTypes from 'prop-types';

import axiosClient from '../api/axiosClient';
import { createContext, useContext, useLayoutEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import handleError from '../utils/handleError';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const [cartList, setCartList] = useState([]);
    const [cartLength, setCartLength] = useState(0);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        if (!currentUser) return;
        setLoading(true);
        axiosClient
            .get('cart', {
                params: {
                    userId: currentUser?.id,
                },
            })
            .then((response) => {
                setCartList(response.data.data.items);
                setCartLength(response.data.data.length);
                setLoading(false);
            })
            .catch((error) => {
                handleError(error);
                setLoading(false);
            });
    }, []);

    return (
        !loading && (
            <CartContext.Provider value={{ setCartList, cartList, loading, cartLength, setCartLength }}>
                {children}
            </CartContext.Provider>
        )
    );
};

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartContext;
