import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

const CartDropdown = ({ items, updateCart }) => {

    const router = useRouter();
    const [cartItems, setCartItems] = useState([]); // State for cart items
    const [shouldUpdateCart, setShouldUpdateCart] = useState(false); // Estado para monitorear si se debe actualizar el carrito
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    useEffect(() => {
        if (items.length > 0) {
            setCartItems(items);
            sessionStorage.setItem('cartItems', JSON.stringify(items));
        }
    }, [items]); // Dependencia en el estado items

    useEffect(() => {
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems)); // Load cart from session storage
        }
    }, []); // Empty dependency array to run only on mount

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save updated cart to session storage
    }, [cartItems]); // Dependencia en el estado cartItems

    useEffect(() => {
        if (shouldUpdateCart) {
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save updated cart to session storage
            setShouldUpdateCart(false);
        }
    }, [shouldUpdateCart, cartItems]); // Dependencia en el estado shouldUpdateCart y cartItems

    const total = items.reduce((acc, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
        return acc + price;
    }, 0).toFixed(2);

    const handleCheckoutClick = async () => {
        try {
            // Obtener el token desde localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                alert('No se encontró un token. Por favor, inicia sesión.');
                setShowModal(true);
                return;
            }

            // Hacer la solicitud al backend para verificar la sesión
            const response = await axios.get('http://localhost:8000/api/check-session', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Enviar el token como un encabezado
                }
            });

            console.log(response); // Verifica la respuesta para asegurarte de que es la correcta

            const isAuthenticated = response.data.isAuthenticated;

            // Si el usuario está autenticado, redirigir al checkout
            if (isAuthenticated) {
                router.push('/pedido/FinalizarPedido');
            } else {
                // Si no está autenticado, mostrar el modal
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error al verificar la sesión:', error);
            console.error('Detalles del error:', error.response ? error.response.data : error);

            // Si hay un error, mostrar un mensaje al usuario
            alert('Hubo un error al verificar la sesión. Inténtalo de nuevo más tarde.');
        }
    };


    const addToCart = (item) => {
        setCartItems((prevItems) => {
            console.log("s");
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...existingItem, quantity: existingItem.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
        setShouldUpdateCart(true); // Actualiza el estado shouldUpdateCart para guardar el carrito en session storage
    };

    const clearCart = () => {
        setCartItems([]);
        sessionStorage.removeItem('cartItems');
    };

    const irARegistro = () => {
        setShowModal(false); // Cerrar el modal
        router.push('/registro/Registro'); // Redirigir al registro
    };

    const cancelarRegistro = () => {
        setShowModal(false); // Cerrar el modal
        alert('No se puede realizar la compra. Por favor, regístrate para continuar.');
    };

    return (
        <div className="relative">
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 w-96"> {/* Increased width to w-96 */}
                <div className="p-6"> {/* Increased padding */}
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Productos Seleccionados</h3>
                    {items.length === 0 ? (
                        <p className="text-gray-500">El carrito está vacío.</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between my-2 p-2 bg-gray-100 rounded-md">
                                <div className="flex items-center">
                                    <Image
                                        src={item.imagen ? `http://localhost:8000/images/${item.imagen}` : '/assets/img/default.png'}
                                        alt={item.nombre || 'Imagen predeterminada'}
                                        width={250}
                                        height={250}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                        <p className="text-gray-600 text-sm">Precio: ${item.price}</p>
                                    </div>
                                </div>
                                <button className="text-red-500 hover:text-red-700">
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {items.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold text-gray-800">Total:</span>
                            <span className="text-gray-800">${total}</span>
                        </div>
                        <button
                            className="bg-yellow-500 text-white rounded-md px-4 py-2 w-full mt-2 hover:bg-yellow-600 transition-all"
                            onClick={handleCheckoutClick}
                        >
                            Finalizar Compra
                        </button>
                        {/* Modal emergente si no está autenticado */}
                        {showModal && (
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                                    <h2>ss</h2>
                                    <div>ss</div>
                                    <div>ss</div>
                                    <h2 className="text-xl font-semibold mb-4">No has iniciado sesión</h2>
                                    <p className="mb-6 text-gray-700">Para poder realizar la compra, necesitas estar registrado. ¿Quieres registrarte?</p>
                                    <div className="flex justify-between">
                                        <button
                                            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-blue-500"
                                            onClick={irARegistro}
                                        >
                                            Sí, quiero registrarme
                                        </button>
                                        <button
                                            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            onClick={cancelarRegistro}
                                        >
                                            No, cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDropdown;
