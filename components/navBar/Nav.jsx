import React from 'react';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import CartDropdown from '../cartDropdown/CartDropdown';

import axios from 'axios';

const Nav = () => {

    const [isMounted, setIsMounted] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No autenticado: token no encontrado');
                setUserName('Invitado');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/check-session', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserName(response.data.name);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                setUserName('Invitado');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);



    useEffect(() => {
        setIsMounted(true);
        setCartItems([]); // Inicializar el carrito vacío
    }, []);




    // Función para agregar productos al carrito
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...existingItem, quantity: existingItem.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };



    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products');
            console.log('Datos obtenidos del backend:', response.data);

            // Filtra los productos con categoría "2"
            const filteredProducts = Array.isArray(response.data.products)
                ? response.data.products.filter(product => product.categoria === "2")
                : [];

            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setProducts([]); // Asegura que products sea un array incluso si hay un error
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleCartDropdown = () => {
        setCartOpen(!cartOpen);
    };

    const getTotalItems = () => {
        return cartItems.length;
    };


    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleMenuOptionClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="container flex items-center justify-between h-16 sm:h-20">
            <div className="font-Lobster sm:text-2xl">New Bids.</div>
            <div
                id="nav-menu"
                className={`absolute top-0 ${menuOpen ? 'left-0' : 'left-[-100%]'} min-h-[80vh] w-full bg-orange-400/80 backdrop-blur-sm flex items-center justify-center duration-300 lg:static lg:min-h-fit lg:bg-transparent lg:w-auto`}
            >
                <ul className="flex flex-col items-center gap-8 lg:flex-row">
                    <li>
                        <Link href="#home" className="nav-link" onClick={handleMenuOptionClick}>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="#about" className="nav-link" onClick={handleMenuOptionClick}>
                            Sobre Nosotros
                        </Link>
                    </li>
                    <li>
                        <Link href="#review" className="nav-link" onClick={handleMenuOptionClick}>
                            Menu
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                toggleMenu();
                                handleMenuOptionClick();
                            }}
                            className="text-white bg-yellow-500 px-4 py-2 rounded relative"
                        >
                            <i className="ri-shopping-cart-line"></i>
                            {/* Add conditional rendering for cart items count here */}
                        </button>
                    </li>
                </ul>
            </div>
            <div className="text-xl sm:text-3xl cursor-pointer z-50 lg:hidden" onClick={toggleMenu}>
                <i className={`ri-${menuOpen ? 'close-line' : 'menu-4-line'}`} id="hamburger"></i>
            </div>
        </nav>
    );
};

export default Nav;