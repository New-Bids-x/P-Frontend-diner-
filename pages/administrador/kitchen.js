import { useState, useEffect } from 'react';
import { CheckCircleIcon, ClipboardListIcon } from '@heroicons/react/outline';

const Kitchen = () => {
    const [orders, setOrders] = useState([
        { id: 1, details: 'Pedido 1: Pollo de pepperoni', timeLeft: 0, status: 'pendiente' },
        { id: 2, details: 'Pedido 2: Pollo a la parrilla', timeLeft: 0, status: 'pendiente' },
        { id: 3, details: 'Pedido 3: Pollo al horno', timeLeft: 0, status: 'pendiente' }
    ]);
    const [nextOrderId, setNextOrderId] = useState(4);
    const [deliveredOrders, setDeliveredOrders] = useState(0); // Guardamos el número de pedidos entregados

    const addOrder = (orderDetails) => {
        const newOrder = {
            id: nextOrderId,
            details: orderDetails,
            timeLeft: 0,
            status: 'pendiente'
        };
        setOrders((prevOrders) => [...prevOrders, newOrder]);
        setNextOrderId(nextOrderId + 1);
    };

    useEffect(() => {
        const intervals = orders.map((order) =>
            setInterval(() => {
                setOrders((prevOrders) =>
                    prevOrders.map((prevOrder) =>
                        prevOrder.id === order.id
                            ? { ...prevOrder, timeLeft: prevOrder.timeLeft + 1 }
                            : prevOrder
                    )
                );
            }, 1000)
        );

        return () => intervals.forEach(clearInterval);
    }, [orders]);

    const markAsReady = (orderId) => {
        setOrders((prevOrders) => {
            const updatedOrders = prevOrders.filter((order) => order.id !== orderId); // Elimina el pedido
            setDeliveredOrders((prevDeliveredOrders) => prevDeliveredOrders + 1); // Incrementa los pedidos entregados
            return updatedOrders;
        });
    };

    const markAsInProgress = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: 'en proceso' } : order
            )
        );
    };

    const pendingOrders = orders.filter((order) => order.status !== 'entregado').length;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
                Cocina - Gestión de Pedidos
            </h1>

            {/* Indicadores de pedidos */}
            <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <ClipboardListIcon className="h-6 w-6 text-yellow-500" />
                    <span className="text-xl font-semibold text-gray-800">
                        Pedidos pendientes: {pendingOrders}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="text-xl font-semibold text-gray-800">
                        Pedidos entregados: {deliveredOrders}
                    </span>
                </div>
            </div>

            {/* Contenedor de pedidos */}
            <div
                className={`grid ${orders.length <= 3
                    ? 'grid-cols-1'
                    : orders.length <= 6
                        ? 'grid-cols-2'
                        : orders.length <= 10
                            ? 'grid-cols-3'
                            : 'grid-cols-4'
                    } gap-6`}
            >
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className={`p-4 mb-4 rounded-lg shadow-lg border border-black transform transition-transform hover:scale-105 ${order.status === 'en proceso'
                            ? 'bg-yellow-100'
                            : order.status === 'pendiente'
                                ? 'bg-white'
                                : 'bg-green-100'
                            }`}
                    >
                        <img
                            src="/assets/img/polloE.png"
                            alt={`Pedido ${order.id}`}
                            className="w-32 h-32 mx-auto object-cover mb-4 rounded-full shadow-md"
                        />
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">
                            Pedido #{order.id}
                        </h2>
                        <p className="text-gray-700 text-center">{order.details}</p>
                        <p
                            className={`mt-4 text-center text-lg font-bold ${order.timeLeft > 0 ? 'text-red-600' : 'text-green-600'
                                }`}
                        >
                            Tiempo: {order.timeLeft > 0 ? `${order.timeLeft}s` : 'Listo'}
                        </p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                onClick={() => markAsInProgress(order.id)}
                            >
                                En proceso
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                onClick={() => markAsReady(order.id)}
                            >
                                Listo
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón para agregar pedidos */}
            <div className="flex justify-center mt-10">
                <button
                    onClick={() => addOrder('Ejemplo de pedido: Pollo asado')}
                    className="px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-blue-800 shadow-lg transform transition-transform hover:scale-105"
                >
                    Agregar Pedido
                </button>
            </div>
        </div>
    );
};

export default Kitchen;
