import { useState } from 'react';

const DetallePedido = ({ pedido, total }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetalle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mt-4 p-4 text-black">
            <button
                className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-2 px-6 rounded-lg w-full"
                onClick={toggleDetalle}
            >
                {isOpen ? 'Ocultar Detalle' : 'Mostrar Detalle'}
            </button>
            {isOpen && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-black mb-4">Detalle del Pedido</h3>
                    {pedido.length === 0 ? (
                        <p className="text-black text-center">No hay productos en el pedido</p>
                    ) : (
                        <div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 text-black">Producto</th>
                                        <th className="py-2 text-black">Cantidad</th>
                                        <th className="py-2 text-black">Precio</th>
                                        <th className="py-2 text-black">Subtotal</th>
                                        <th className="py-2 text-black">Hora</th>
                                        <th className="py-2 text-black">Promoción</th>
                                        <th className="py-2 text-black">Descuento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedido.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-2 text-black">{item.producto.nombre}</td>
                                            <td className="py-2 text-black">{item.cantidad}</td>
                                            <td className="py-2 text-black">{item.producto.precio} BS</td>
                                            <td className="py-2 text-black">{item.subtotal} BS</td>
                                            <td className="py-2 text-black">{item.fechaRegistro}</td>
                                            <td className="py-2 text-black">{item.promocion ? 'Sí' : 'No'}</td>
                                            <td className="py-2 text-black">{item.descuento} BS</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 text-lg font-semibold text-black text-right">
                                Total: <span className="text-red-500">{total}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

};

export default DetallePedido;