import { useEffect, useState } from 'react';
import axios from 'axios';

const HistorialPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/pedidos');
                console.log(response.data); // Muestra los datos en la consola
                setPedidos(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error al obtener los pedidos');
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600">Cargando historial de pedidos...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Historial de Pedidos</h1>
            {pedidos.length === 0 ? (
                <p className="text-gray-500">No hay pedidos en el historial.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Fecha</th>
                            <th className="border border-gray-300 p-2">Hora</th>
                            <th className="border border-gray-300 p-2">Estado</th>
                            <th className="border border-gray-300 p-2">Pedido</th>
                            <th className="border border-gray-300 p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2">{pedido.id}</td>
                                <td className="border border-gray-300 p-2">{pedido.fecha}</td>
                                <td className="border border-gray-300 p-2">{pedido.hora}</td>
                                <td className="border border-gray-300 p-2">{pedido.estado}</td>
                                <td className="border border-gray-300 p-2">
                                    {pedido.pedido.map((item, index) => (
                                        <div key={index}>
                                            {item.cantidad} x {item.nombre}
                                        </div>
                                    ))}
                                </td>
                                <td className="border border-gray-300 p-2">{pedido.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HistorialPedidos;
