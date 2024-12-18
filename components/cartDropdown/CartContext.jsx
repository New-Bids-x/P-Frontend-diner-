import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false); // Estado de compra

    useEffect(() => {
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (isCheckout) {
            setCartItems([]);
            sessionStorage.removeItem('cartItems');
        }
    }, [isCheckout]);

    const addToCart = (item) => {
        // Lógica para agregar al carrito
        setCartItems([...cartItems, item]);
    };

    const removeFromCart = (itemId) => {
        // Lógica para eliminar del carrito
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const handleCheckout = () => {
        setIsCheckout(true);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCheckout, handleCheckout }}>
            {children}
        </CartContext.Provider>
    );
};