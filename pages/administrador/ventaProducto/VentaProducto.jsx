import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaHistory, FaShoppingCart } from 'react-icons/fa';
import { FaCreditCard, FaCashRegister, FaPaypal } from 'react-icons/fa';
import DetallePedido from './DetallePedido'; // Ensure correct path

const VentaProducto = () => {
    const [activeSection, setActiveSection] = useState('');
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [orderId, setOrderId] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [pedidoDetails, setPedidoDetails] = useState([]);
    const [totalPedido, setTotalPedido] = useState('0.00 BS');

    // Fetch categories and products
    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products2');
                const fetchedCategories = response.data.categories;
                setCategories(fetchedCategories);

                if (fetchedCategories.length > 0) {
                    setActiveSection(fetchedCategories[0].categoria);
                    setProductsByCategory(fetchedCategories[0].productos);
                }
            } catch (error) {
                console.error("Error al cargar las categorías y productos:", error);
                alert("No se pudieron cargar las categorías o productos.");
            }
        };

        fetchCategoriesAndProducts();
    }, []);

    const updateQuantity = (product, operation) => {
        const { id, precio, nombre } = product;

        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[id] || 0;
            const newQuantity =
                operation === 'incrementar' ? currentQuantity + 1 : Math.max(0, currentQuantity - 1);

            // Update pedido details when quantity changes
            setPedidoDetails(prevDetails => {
                // Remove existing entry for this product
                const filteredDetails = prevDetails.filter(item => item.producto.id !== id);

                // If new quantity is greater than 0, add to details
                if (newQuantity > 0) {
                    const orderItem = {
                        producto: {
                            id: id,
                            nombre: nombre,
                            precio: precio
                        },
                        cantidad: newQuantity,
                        fechaRegistro: new Date().toLocaleString(),
                        promocion: false, // You can implement logic to check for promotions
                        descuento: 0, // You can implement discount logic
                        subtotal: (precio * newQuantity).toFixed(2)
                    };
                    return [...filteredDetails, orderItem];
                }

                return filteredDetails;
            });

            return { ...prevQuantities, [id]: newQuantity };
        });
    };

    const total = pedidoDetails.reduce((acc, item) => {
        return acc + parseFloat(item.subtotal);
    }, 0);

    const confirmarPedido = async () => {
        const pedidoDate = {
            pedido: pedidoDetails.map(item => ({
                nombre: item.producto.nombre,
                cantidad: item.cantidad,
                precio: item.producto.precio,
                subtotal: item.subtotal,
                promocion: item.promocion,
                descuento: item.descuento
            })),
            total: `${total.toFixed(2)} BS`,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/pedidos', pedidoDate);
            console.log("Respuesta del backend:", response.data);
            setOrderId(response.data.id);
            alert("Pedido guardado correctamente.");
        } catch (error) {
            console.error("Error al guardar el pedido:", error.response);
            alert("Error al guardar el pedido.");
        }
    };

    const handleCategoryChange = (categoryId) => {
        const selectedCategory = categories.find((category) => category.categoria === categoryId);
        setActiveSection(categoryId);
        setProductsByCategory(selectedCategory ? selectedCategory.productos : []);
    };

    return (
        <div className="bg-red-100">
            {/* Navigation Bar */}
            <nav className="bg-red-900 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-6">
                        <button className="flex items-center">
                            <FaHistory className="mr-2" />
                            Historial
                        </button>
                        <button className="flex items-center">
                            <FaShoppingCart className="mr-2" />
                            Carrito
                        </button>
                    </div>
                    <div className="text-lg font-semibold">
                        Pedido ID: {orderId || 'En progreso'}
                    </div>
                </div>
            </nav>

            <main className="pt-20">
                <section id="inicio" className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
                    <header className="px-6 py-4 bg-red-900 text-white text-center">
                        <h2 className="text-4xl font-bold">PEDIDOS</h2>
                    </header>

                    {/* Category Buttons */}
                    <section className="px-6 py-4">
                        <div className="flex justify-center space-x-4 md:space-x-8 mt-4 flex-wrap">
                            {categories.map((category) => (
                                <button
                                    key={category.categoria}
                                    className={`category-button px-4 py-2 text-lg font-semibold text-gray-700 ${activeSection === category.categoria
                                        ? 'bg-red-500 text-white'
                                        : 'bg-red-200'
                                        } rounded-full`}
                                    onClick={() => handleCategoryChange(category.categoria)}
                                >
                                    {`Categoría ${category.categoria}`}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Products Section */}
                    <section className="p-6 space-y-6">
                        {productsByCategory.map((product) => (
                            <div key={product.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                                <div className="flex items-center space-x-6">
                                    <Image
                                        src={product.imagen ? `http://localhost:8000/images/${product.imagen}` : '/assets/img/default.png'}
                                        alt={product.nombre || 'Imagen predeterminada'}
                                        width={100}
                                        height={100}
                                        className="rounded-lg shadow-lg"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">{product.nombre}</h3>
                                        <span className="text-lg text-gray-600">{product.precio} BS</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="w-10 h-10 text-white bg-yellow-500 rounded-full btn"
                                        onClick={() => updateQuantity(product, 'decrementar')}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-semibold text-gray-700">{quantities[product.id] || 0}</span>
                                    <button
                                        className="w-10 h-10 text-white bg-red-500 rounded-full btn"
                                        onClick={() => updateQuantity(product, 'incrementar')}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Table Selection */}
                    <section className="mb-8 p-6 bg-gray-50 shadow-md rounded-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Seleccionar Mesa</h2>
                        <select
                            value={metodoPago}
                            onChange={(e) => setMetodoPago(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-md text-gray-700 mb-4"
                        >
                            <option value="">Mesas Disponibles</option>
                            <option value="Mesa"> 1</option>
                            <option value="Mesa"> 2</option>
                            <option value="Mesa"> 3</option>
                        </select>
                        <div className="flex justify-around text-2xl">
                            {metodoPago === 'Mesa' && <FaCreditCard />}
                            {metodoPago === 'Mesa' && <FaCashRegister />}
                            {metodoPago === 'Mesa' && <FaPaypal />}
                        </div>
                    </section>

                    {/* Order Details Component */}
                    <DetallePedido
                        pedido={pedidoDetails}
                        total={`${total.toFixed(2)} BS`}
                    />

                    {/* Footer */}
                    <footer className="px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-red-100">
                        <div className="text-lg font-semibold text-gray-700 md:mr-auto">
                            Total: <span className="text-red-500">{total.toFixed(2)} BS</span>
                        </div>

                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <button
                                className="flex items-center bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-2 px-6 rounded-lg btn"
                                onClick={confirmarPedido}
                            >
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