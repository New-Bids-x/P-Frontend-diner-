import React from 'react';
import { useRouter } from 'next/router';

const CartDropdown = ({ items }) => {
    const router = useRouter();

    const total = items.reduce((acc, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
        return acc + price;
    }, 0).toFixed(2);

    const handleCheckoutClick = () => {
        router.push('/registro/Registro');
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
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 rounded mr-3 object-cover" // Slightly larger image size
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDropdown;
