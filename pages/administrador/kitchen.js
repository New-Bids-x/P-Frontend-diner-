// import { useState, useEffect } from 'react';
// import { CheckCircleIcon, ClipboardListIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

// const Kitchen = () => {
//     const [orders, setOrders] = useState([
//         { id: 1, details: 'Pedido 1: Pollo de pepperoni', timeLeft: 0, status: 'pendiente', timerStarted: false, type: 'online', priority: false, customerName: 'Juan Pérez' },
//         { id: 2, details: 'Pedido 2: Pollo a la parrilla', timeLeft: 0, status: 'pendiente', timerStarted: false, type: 'mesa', priority: true, customerName: 'Ana Gómez' },
//         { id: 3, details: 'Pedido 3: Pollo al horno', timeLeft: 0, status: 'pendiente', timerStarted: false, type: 'online', priority: false, customerName: 'Carlos Martínez' }
//     ]);
//     const [nextOrderId, setNextOrderId] = useState(4);
//     const [deliveredOrders, setDeliveredOrders] = useState(0);

//     const addOrder = (orderDetails, type = 'online', priority = false, customerName = 'Cliente Desconocido') => {
//         const newOrder = {
//             id: nextOrderId,
//             details: orderDetails,
//             timeLeft: 0,
//             status: 'pendiente',
//             timerStarted: false,
//             type: type,
//             priority: priority,
//             customerName: customerName
//         };
//         setOrders((prevOrders) => [...prevOrders, newOrder]);
//         setNextOrderId(nextOrderId + 1);
//     };

//     useEffect(() => {
//         const intervals = orders.map((order) => {
//             if (order.timerStarted) {
//                 return setInterval(() => {
//                     setOrders((prevOrders) =>
//                         prevOrders.map((prevOrder) =>
//                             prevOrder.id === order.id
//                                 ? { ...prevOrder, timeLeft: prevOrder.timeLeft + 1 }
//                                 : prevOrder
//                         )
//                     );
//                 }, 1000);
//             }
//             return null;
//         });

//         return () => intervals.forEach(clearInterval);
//     }, [orders]);

//     const markAsReady = (orderId) => {
//         setOrders((prevOrders) => {
//             const updatedOrders = prevOrders.filter((order) => order.id !== orderId);
//             setDeliveredOrders((prevDeliveredOrders) => prevDeliveredOrders + 1);
//             return updatedOrders;
//         });
//     };

//     const markAsInProgress = (orderId) => {
//         setOrders((prevOrders) =>
//             prevOrders.map((order) =>
//                 order.id === orderId
//                     ? { ...order, status: 'en proceso', timerStarted: true }
//                     : order
//             )
//         );
//     };

//     const pendingOrders = orders.filter((order) => order.status !== 'entregado').length;

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
//             <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Cocina - Gestión de Pedidos</h1>

//             {/* Indicadores de pedidos */}
//             <div className="flex justify-center gap-6 mb-6">
//                 <div className="flex items-center gap-2">
//                     <ClipboardListIcon className="h-6 w-6 text-yellow-500" />
//                     <span className="text-xl font-semibold text-gray-800">Pedidos pendientes: <span className="text-black">{pendingOrders}</span></span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <CheckCircleIcon className="h-6 w-6 text-green-500" />
//                     <span className="text-xl font-semibold text-gray-800">Pedidos entregados: <span className="text-black">{deliveredOrders}</span></span>
//                 </div>
//             </div>

//             {/* Contenedor de pedidos */}
//             <div
//                 className={`grid ${orders.length <= 3
//                     ? 'grid-cols-1'
//                     : orders.length <= 6
//                         ? 'grid-cols-2'
//                         : orders.length <= 10
//                             ? 'grid-cols-3'
//                             : 'grid-cols-4'
//                     } gap-6`}
//             >
//                 {orders.map((order) => (
//                     <div
//                         key={order.id}
//                         className={`p-4 mb-4 rounded-lg shadow-lg border border-black transform transition-transform hover:scale-105 ${order.status === 'en proceso'
//                             ? 'bg-yellow-100'
//                             : order.status === 'pendiente'
//                                 ? 'bg-white'
//                                 : 'bg-green-100'
//                             }`}
//                     >
//                         <img
//                             src="/assets/img/polloE.png"
//                             alt={`Pedido ${order.id}`}
//                             className="w-32 h-32 mx-auto object-cover mb-4 rounded-full shadow-md"
//                         />
//                         <h2 className="text-2xl font-semibold text-black text-center">
//                             Pedido #{order.id}
//                         </h2>
//                         <p className="text-black text-center">{order.details}</p>
//                         <p className="text-black text-center">Cliente: {order.customerName}</p>
//                         <p className={`mt-4 text-center text-black font-bold ${order.timeLeft > 0 ? 'text-red-600' : 'text-black'}`}>
//                             Tiempo: {order.timeLeft > 0 ? `${order.timeLeft}s` : 'Listo'}
//                         </p>

//                         {/* Tipo de pedido y prioridad */}
//                         <div className="text-center mt-2">
//                             <span className={`px-4 py-1 text-black rounded-full ${order.type === 'online' ? 'bg-blue-600' : 'bg-green-600'}`}>
//                                 {order.type === 'online' ? 'Online' : 'Mesa'}
//                             </span>
//                             {order.priority && (
//                                 <span className="ml-2 px-4 py-1 text-black bg-red-600 rounded-full">Urgente</span>
//                             )}
//                         </div>

//                         <div className="flex justify-between mt-4">
//                             <button
//                                 className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//                                 onClick={() => markAsInProgress(order.id)}
//                             >
//                                 En proceso
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                                 onClick={() => markAsReady(order.id)}
//                             >
//                                 Listo
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Botón para agregar pedidos */}
//             <div className="flex justify-center mt-10">
//                 <button
//                     onClick={() => addOrder('Ejemplo de pedido: Pollo asado', 'mesa', false, 'Carlos Martínez')}
//                     className="px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-blue-800 shadow-lg transform transition-transform hover:scale-105"
//                 >
//                     Agregar Pedido
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Kitchen;


import { useState, useEffect } from 'react';
import { CheckCircleIcon, ClipboardListIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

const Kitchen = () => {
    const [orders, setOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState(0);

    // Fetch orders from the API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/pedidos2');
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    // Function to update the status of the order to 'in process'
    const markAsInProgress = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId
                    ? { ...order, estado: 'en proceso' }
                    : order
            )
        );
    };

    // Function to mark the order as 'ready'
    const markAsReady = (orderId) => {
        setOrders((prevOrders) => {
            const updatedOrders = prevOrders.filter((order) => order.id !== orderId);
            setDeliveredOrders((prevDeliveredOrders) => prevDeliveredOrders + 1);
            return updatedOrders;
        });
    };

    const pendingOrders = orders.filter((order) => order.estado !== 'entregado').length;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Cocina - Gestión de Pedidos</h1>

            {/* Indicadores de pedidos */}
            <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <ClipboardListIcon className="h-6 w-6 text-yellow-500" />
                    <span className="text-xl font-semibold text-gray-800">Pedidos pendientes: <span className="text-black">{pendingOrders}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="text-xl font-semibold text-gray-800">Pedidos entregados: <span className="text-black">{deliveredOrders}</span></span>
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
                        className={`p-4 mb-4 rounded-lg shadow-lg border border-black transform transition-transform hover:scale-105 ${order.estado === 'en proceso'
                            ? 'bg-yellow-100'
                            : order.estado === 'pendiente'
                                ? 'bg-white'
                                : 'bg-green-100'
                            }`}
                    >
                        <img
                            src="/assets/img/polloE.png"
                            alt={`Pedido ${order.id}`}
                            className="w-32 h-32 mx-auto object-cover mb-4 rounded-full shadow-md"
                        />
                        <h2 className="text-2xl font-semibold text-black text-center">
                            Pedido #{order.id}
                        </h2>
                        <p className="text-black text-center">Cliente: {order.nombre_cliente}</p>
                        <p className="text-black text-center">Restaurante: {order.restaurante}</p>
                        <p className="text-black text-center">Dirección: {order.direccion}</p>
                        <p className="text-black text-center">Método de pago: {order.metodo_pago}</p>
                        <p className="text-black text-center">Total: ${order.total}</p>

                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Productos:</h3>
                            <ul className="list-disc pl-5">
                                {order.items.map((item) => (
                                    <li key={item.id} className="text-black">
                                        {item.nombre_producto} x {item.cantidad} - ${item.precio}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Estado del pedido */}
                        <p className={`mt-4 text-center text-black font-bold ${order.estado === 'en proceso' ? 'text-red-600' : 'text-black'}`}>
                            Estado: {order.estado}
                        </p>

                        {/* Acciones de la cocina */}
                        <div className="flex justify-between mt-4">
                            <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                onClick={() => markAsInProgress(order.id)}
                                disabled={order.estado === 'en proceso' || order.estado === 'entregado'}
                            >
                                En proceso
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                onClick={() => markAsReady(order.id)}
                                disabled={order.estado === 'entregado'}
                            >
                                Listo
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kitchen;
