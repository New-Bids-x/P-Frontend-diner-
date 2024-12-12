import React, { useEffect, useState } from 'react';
import {
    LineChart as RechartsLineChart,
    Line as RechartsLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    BarChart,
    Bar,
    ResponsiveContainer,
} from 'recharts';
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

const RestaurantSalesDashboard = () => {
    const [pedidos, setPedidos] = useState([]);
    const [salesData, setSalesData] = useState({
        hourlyData: [],
        topDishes: [],
        totalRevenue: 0,
        totalOrders: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/pedidos');
                const data = await response.json();
                setPedidos(data);
                processSalesData(data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchData();
    }, []);

    const processSalesData = (data) => {
        const platoVendidoObj = {};
        const horasVendidas = {};
        let totalRevenue = 0;

        data.forEach((pedido) => {
            pedido.pedido.forEach((item) => {
                platoVendidoObj[item.nombre] =
                    (platoVendidoObj[item.nombre] || 0) + item.cantidad;

                const hora = pedido.hora.substring(0, 2);
                horasVendidas[hora] =
                    (horasVendidas[hora] || 0) + item.cantidad;

                totalRevenue += item.cantidad * (item.precio || 0);
            });
        });

        const hourlyData = Object.keys(horasVendidas).map(hora => ({
            hora,
            ventas: horasVendidas[hora],
        })).sort((a, b) => a.hora.localeCompare(b.hora));

        const topDishes = Object.entries(platoVendidoObj)
            .map(([nombre, cantidad]) => ({ nombre, cantidad }))
            .sort((a, b) => b.cantidad - a.cantidad)
            .slice(0, 5);

        setSalesData({
            hourlyData,
            topDishes,
            totalRevenue: Math.round(totalRevenue),
            totalOrders: data.length,
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Graficos de venta</h2>
                <div className="bg-white p-6 shadow-lg rounded-md flex items-center">
                    <FaMoneyBillWave className="text-green-500 text-4xl mr-4" />
                    <div>
                        <h3 className="font-bold text-gray-600">Ingresos Totales</h3>
                        <p className="text-3xl font-bold text-gray-800">${salesData.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-md flex items-center">
                    <FaShoppingCart className="text-blue-500 text-4xl mr-4" />
                    <div>
                        <h3 className="font-bold text-gray-600">Pedidos Totales</h3>
                        <p className="text-3xl font-bold text-gray-800">{salesData.totalOrders}</p>
                    </div>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ventas por Hora */}
                <div className="bg-white p-6 shadow-lg rounded-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Ventas por Hora</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={salesData.hourlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hora" />
                            <YAxis />
                            <RechartsTooltip />
                            <RechartsLine
                                type="monotone"
                                dataKey="ventas"
                                stroke="#f97316"
                                strokeWidth={3}
                            />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </div>

                {/* Top 5 Platos */}
                <div className="bg-white p-6 shadow-lg rounded-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 5 Platos Más Vendidos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData.topDishes}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <RechartsTooltip />
                            <Bar dataKey="cantidad" fill="#34d399" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RestaurantSalesDashboard;
