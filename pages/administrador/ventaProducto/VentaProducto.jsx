import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import HistorialProducto from '../historialPedidos/HistorialPedidos';

const VentaProducto = () => {
    const [activeSection, setActiveSection] = useState('pollos-fritos');
    const [showHistorial, setShowHistorial] = useState(false);
    const [quantities, setQuantities] = useState({
        'cantidad-pollo-pequeno': 1,
        'cantidad-sopa': 1,
        'cantidad-coca': 1,
    });

    const updateQuantity = (id, operation) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[id];
            const newQuantity =
                operation === 'incrementar' ? currentQuantity + 1 : Math.max(0, currentQuantity - 1);
            return { ...prevQuantities, [id]: newQuantity };
        });
    };

    const total = quantities['cantidad-pollo-pequeno'] * 10 + quantities['cantidad-sopa'] * 8 + quantities['cantidad-coca'] * 7;

    const confirmarPedido = async () => {
        const pedidoDate = {
            pedido: [
                { nombre: 'Pollo Frito Pequeño', cantidad: quantities['cantidad-pollo-pequeno'] },
                { nombre: 'Sopa de Pollo', cantidad: quantities['cantidad-sopa'] },
                { nombre: 'Coca Cola', cantidad: quantities['cantidad-coca'] },
            ],
            total: `${total} BS`
        };

        console.log("Datos del pedido:", JSON.stringify(pedidoDate, null, 2));

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/pedidos', pedidoDate);
            console.log("Respuesta del backend:", response.data);
            alert("Pedido guardado correctamente.");
        } catch (error) {
            console.error("Error al guardar el pedido:", error.response);
            alert("Error al guardar el pedido.");
        }
    };
    
    const toggleHistorial = () => {
        setShowHistorial(!showHistorial); // Cambia el estado de visibilidad
    };



    return (
        <div className="bg-red-100">
            {/* Header */}
            <header className="bg-red-900 fixed w-full z-50">
                <nav className="container mx-auto flex items-center justify-between h-16">
                    <div className="text-white font-bold text-xl">New Bids</div>
                    <div className="hidden lg:flex space-x-6">
                        <a href="#inicio" className="text-white hover:text-red-300">Inicio</a>
                        <a href="#productos" className="text-white hover:text-red-300">Historial</a>
                        <a href="#notificaciones" className="text-white hover:text-red-300">
                            <i className="ri-notification-3-line text-2xl"></i>
                        </a>
                        <a href="#carrito" className="text-white hover:text-red-300">
                            <i className="ri-shopping-cart-line text-2xl"></i>
                        </a>
                    </div>
                    <div className="lg:hidden">
                        <button id="hamburger" className="text-white text-3xl">
                            <i className="ri-menu-line"></i>
                        </button>
                    </div>
                </nav>
            </header>

            <main className="pt-20">
                {/* Sección de Pedidos */}
                <section id="inicio" className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
                    <header className="px-6 py-4 bg-red-900 text-white text-center">
                        <h2 className="text-4xl font-bold">PEDIDOS</h2>
                    </header>

                    <section className="px-6 py-4">
                        <div className="text-xl font-semibold text-gray-700">
                            ID del Pedido: <span className="text-red-500">125</span>
                        </div>

                        <div className="flex justify-center space-x-4 md:space-x-8 mt-4 flex-wrap">
                            {['pollos-fritos', 'completos', 'refrescos'].map((section) => (
                                <button
                                    key={section}
                                    className="category-button px-4 py-2 text-lg font-semibold text-gray-700 bg-red-200 rounded-full"
                                    onClick={() => setActiveSection(section)}
                                >
                                    {section === 'pollos-fritos' ? 'POLLOS FRITOS' : section === 'completos' ? 'COMPLETOS' : 'REFRESCOS'}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Secciones de productos */}
                    <section className={`p-6 space-y-6 ${activeSection !== 'pollos-fritos' ? 'hidden' : ''}`}>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-6">
                                <Image
                                    src="/assets/img/carapollo2.png"
                                    alt="Pollo Frito Pequeño"
                                    width={100}
                                    height={100}
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">POLLO FRITO PEQUEÑO</h3>
                                    <span className="text-lg text-gray-600">10 BS</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="w-10 h-10 text-white bg-yellow-500 rounded-full btn" onClick={() => updateQuantity('cantidad-pollo-pequeno', 'decrementar')}>-</button>
                                <span className="text-xl font-semibold text-gray-700">{quantities['cantidad-pollo-pequeno']}</span>
                                <button className="w-10 h-10 text-white bg-red-500 rounded-full btn" onClick={() => updateQuantity('cantidad-pollo-pequeno', 'incrementar')}>+</button>
                            </div>
                        </div>
                    </section>

                    <section className={`p-6 space-y-6 ${activeSection !== 'completos' ? 'hidden' : ''}`}>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-6">
                                <Image
                                    src="/assets/img/sopa.png"
                                    alt="Sopa de Pollo"
                                    width={100}
                                    height={100}
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">SOPA DE POLLO</h3>
                                    <span className="text-lg text-gray-600">8 BS</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="w-10 h-10 text-white bg-yellow-500 rounded-full btn" onClick={() => updateQuantity('cantidad-sopa', 'decrementar')}>-</button>
                                <span className="text-xl font-semibold text-gray-700">{quantities['cantidad-sopa']}</span>
                                <button className="w-10 h-10 text-white bg-red-500 rounded-full btn" onClick={() => updateQuantity('cantidad-sopa', 'incrementar')}>+</button>
                            </div>
                        </div>
                    </section>

                    <section className={`p-6 space-y-6 ${activeSection !== 'refrescos' ? 'hidden' : ''}`}>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-6">
                                <Image
                                    src="/assets/img/coca.png"
                                    alt="Coca Cola"
                                    width={100}
                                    height={100}
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">COCA COLA</h3>
                                    <span className="text-lg text-gray-600">7 BS</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="w-10 h-10 text-white bg-yellow-500 rounded-full btn" onClick={() => updateQuantity('cantidad-coca', 'decrementar')}>-</button>
                                <span className="text-xl font-semibold text-gray-700">{quantities['cantidad-coca']}</span>
                                <button className="w-10 h-10 text-white bg-red-500 rounded-full btn" onClick={() => updateQuantity('cantidad-coca', 'incrementar')}>+</button>
                            </div>
                        </div>
                    </section>

                    <footer className="px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-red-100">
                        <div className="text-lg font-semibold text-gray-700 md:mr-auto">
                            Total: <span className="text-red-500">{total} BS</span>
                        </div>

                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <button className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-2 px-6 rounded-lg btn">
                                <i className="ri-file-list-3-line mr-2"></i> Detalles Pedido
                            </button>
                            <button className="flex items-center bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-2 px-6 rounded-lg btn" onClick={confirmarPedido}>
                                <i className="ri-check-line mr-2"></i> Confirmar Pedido
                            </button>
                        </div>
                    </footer>
                </section>
            </main>
        </div>
    );
};

export default VentaProducto;
