import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    FaCreditCard,
    FaCashRegister,
    FaPaypal,
    FaMapMarkerAlt,
    FaUser,
    FaPhone,
    FaShoppingCart,
    FaInfoCircle
} from 'react-icons/fa';
import { useRouter } from 'next/router';

// Importamos el componente dinámico del mapa
const DynamicMap = dynamic(() => import('../../components/DynamicMapComponent'), { ssr: false });

const FinalizarPedido = () => {
    const router = useRouter();
    const [ubicacion, setUbicacion] = useState([-17.393286, -66.147534]);
    const [metodoPago, setMetodoPago] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [detallesUbicacion, setDetallesUbicacion] = useState(null);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pedidoInfo, setPedidoInfo] = useState({
        productos: [
            { id: 1, nombre: 'Pollo Broaster', cantidad: 2, precio: 15.00, imagen: '/pollo-broaster.jpg' },
            { id: 2, nombre: 'Pollo a la canasta', cantidad: 1, precio: 180.00, imagen: '/pollo-canasta.jpg' },
        ],
        total: 195.00,
        restaurante: 'Pollos Super Riko',
        fechaEntrega: new Date().toLocaleDateString(),
    });

    // Función para obtener detalles de ubicación
    const obtenerDetallesUbicacion = async (lat, lon) => {
        try {
            const respuesta = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const datos = await respuesta.json();

            setDetallesUbicacion({
                coordenadas: `${lat.toFixed(6)}, ${lon.toFixed(6)}`,
                direccionCompleta: datos.display_name || 'Dirección no disponible',
                pais: datos.address?.country || 'No especificado',
                ciudad: datos.address?.city || datos.address?.town || 'No especificado',
                barrio: datos.address?.neighbourhood || datos.address?.suburb || 'No especificado',
                codigoPostal: datos.address?.postcode || 'No especificado',
                referencia: '' // Puedes agregar un campo para referencias adicionales
            });
        } catch (error) {
            console.error('Error al obtener detalles de ubicación:', error);
            setDetallesUbicacion(null);
        }
    };

    // Manejador de selección de ubicación
    const handleSeleccionUbicacion = (nuevaUbicacion) => {
        setUbicacion(nuevaUbicacion);
        obtenerDetallesUbicacion(nuevaUbicacion[0], nuevaUbicacion[1]);
    };

    // Validación de campos
    const validarFormulario = () => {
        const errores = [];

        if (!nombre) errores.push('Ingrese su nombre');
        if (!telefono) errores.push('Ingrese su teléfono');
        if (!metodoPago) errores.push('Seleccione un método de pago');
        if (!detallesUbicacion) errores.push('Seleccione una ubicación en el mapa');

        return errores;
    };

    // Finalizar pedido
    const finalizarPedido = async () => {
        const errores = validarFormulario();

        if (errores.length > 0) {
            alert('Por favor, corrija los siguientes errores:\n' + errores.join('\n'));
            return;
        }

        setLoading(true);
        setError(null);

        // Reestructurar el payload para asegurarse de que los datos del cliente estén dentro del objeto 'cliente'
        const pedidoFinal = {
            cliente: {  // Asegurarse de que cliente esté como objeto raíz
                nombre,
                telefono,
                email: email || null
            },
            ubicacion: {
                coordenadas: detallesUbicacion?.coordenadas || '',
                direccion_completa: detallesUbicacion?.direccionCompleta || '',
                pais: detallesUbicacion?.pais || '',
                ciudad: detallesUbicacion?.ciudad || '',
                barrio: detallesUbicacion?.barrio || '',
                referencia: detallesUbicacion?.referencia || ''
            },
            metodo_pago: metodoPago,
            restaurante: pedidoInfo.restaurante,
            productos: pedidoInfo.productos.map(producto => ({
                id: producto.id,
                nombre: producto.nombre,
                cantidad: producto.cantidad,
                precio: producto.precio
            })),
            total: pedidoInfo.total
        };

        // Log the payload for debugging
        console.log('Payload being sent:', JSON.stringify(pedidoFinal, null, 2));

        try {
            const response = await axios.post('http://localhost:8000/api/pedidos2', pedidoFinal, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                alert('Pedido enviado con éxito. ¡Gracias por tu compra!');
                router.push('/cliente');
            } else {
                throw new Error(response.data.message || 'Error al procesar el pedido');
            }
        } catch (error) {
            console.error('Error al enviar pedido:', error.response?.data);

            // Handle validation errors
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const errorMessages = Object.entries(validationErrors)
                    .map(([key, messages]) =>
                        `• ${key}: ${messages.join(', ')}`
                    )
                    .join('\n');

                setError(errorMessages);
                alert(`Errores de validación:\n${errorMessages}`);
            } else {
                // Handle other types of errors
                setError(error.response?.data?.message || 'Error al enviar el pedido. Intente nuevamente.');
                alert(error.response?.data?.message || 'Hubo un problema al enviar su pedido.');
            }
        } finally {
            setLoading(false);
        }
    };


    // Cancelar pedido
    const cancelarPedido = () => {
        if (confirm('¿Está seguro que desea cancelar el pedido?')) {
            router.push('/cliente');
        }
    };

    return (
        <section className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
            {/* Encabezado */}
            <div className="bg-orange-500 p-4 rounded-t-lg text-black text-center text-3xl font-semibold flex items-center justify-center gap-4">
                <FaShoppingCart /> Revisar y Finalizar Pedido
            </div>

            {/* Información del Usuario */}
            <section className="mb-8 p-6 bg-gray-50 shadow-md rounded-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUser /> Información del Usuario
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre del que resivira el pedido"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md w-full text-black"
                    />
                    <input
                        type="tel"
                        placeholder="Teléfono (Ej: +591 00000000)"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md w-full text-black"
                    />

                </div>
            </section>

            {/* Mapa de Selección de Dirección */}
            <section className="mb-8 p-6 bg-gray-50 shadow-md rounded-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt /> Selecciona tu Dirección
                </h2>
                <div style={{ height: '400px', width: '100%' }}>
                    <DynamicMap
                        ubicacionInicial={ubicacion}
                        ubicacion={ubicacion}
                        setUbicacion={handleSeleccionUbicacion}
                    />
                </div>

                {detallesUbicacion && (
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => setMostrarDetalles(!mostrarDetalles)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            <FaInfoCircle /> {mostrarDetalles ? 'Ocultar Detalles' : 'Ver Detalles de Ubicación'}
                        </button>
                    </div>
                )}

                {mostrarDetalles && detallesUbicacion && (
                    <div className="mt-4 p-4 bg-white border rounded-md grid md:grid-cols-2 gap-2">
                        <p><strong>Coordenadas:</strong> {detallesUbicacion.coordenadas}</p>
                        <p><strong>País:</strong> {detallesUbicacion.pais}</p>
                        <p><strong>Ciudad:</strong> {detallesUbicacion.ciudad}</p>
                        <p><strong>Barrio:</strong> {detallesUbicacion.barrio}</p>
                        <p className="md:col-span-full"><strong>Dirección Completa:</strong> {detallesUbicacion.direccionCompleta}</p>
                        <div className="md:col-span-full">
                            <label className="block mb-2">Referencia (Opcional)</label>
                            <textarea
                                placeholder="Información adicional para la entrega"
                                className="w-full p-2 border rounded"
                                onChange={(e) => setDetallesUbicacion({
                                    ...detallesUbicacion,
                                    referencia: e.target.value
                                })}
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* Detalles del Pedido */}
            <section className="mb-8 p-6 bg-gray-50 shadow-md rounded-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaShoppingCart /> Detalles del Pedido
                </h2>
                <div className="space-y-4">
                    {pedidoInfo.productos.map((producto) => (
                        <div
                            key={producto.id}
                            className="flex items-center justify-between border-b pb-2"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">{producto.nombre}</p>
                                    <p className="text-gray-600">
                                        Cantidad: {producto.cantidad} |
                                        Precio: ${producto.precio.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <p className="font-bold">
                                ${(producto.cantidad * producto.precio).toFixed(2)}
                            </p>
                        </div>
                    ))}
                    <div className="flex justify-between mt-4">
                        <p className="text-xl font-semibold">Total del Pedido:</p>
                        <p className="text-2xl font-bold text-green-600">
                            ${pedidoInfo.total.toFixed(2)}
                        </p>
                    </div>
                    <div className="mt-2 text-gray-600">
                        <p>Restaurante: {pedidoInfo.restaurante}</p>
                        <p>Fecha de Entrega: {pedidoInfo.fechaEntrega}</p>
                    </div>
                </div>
            </section>

            {/* Selección del Método de Pago */}
            <section className="mb-8 p-6 bg-gray-50 shadow-md rounded-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Método de Pago</h2>
                <select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-md text-gray-700 mb-4"
                >
                    <option value="">Seleccionar método</option>
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="paypal">PayPal</option>
                </select>
                <div className="flex justify-around text-3xl text-gray-600">
                    {metodoPago === 'tarjeta' && <FaCreditCard className="text-blue-500" />}
                    {metodoPago === 'efectivo' && <FaCashRegister className="text-green-500" />}
                    {metodoPago === 'paypal' && <FaPaypal className="text-blue-400" />}
                </div>
            </section>

            {/* Botones de acción */}
            <div className="flex justify-between space-x-4">
                <button
                    className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center gap-2"
                    onClick={finalizarPedido}
                >
                    <FaShoppingCart /> Finalizar Pedido
                </button>
                <button
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 flex items-center justify-center gap-2"
                    onClick={cancelarPedido}
                >
                    Cancelar Pedido
                </button>
            </div>
        </section>
    );
};

export default FinalizarPedido;