import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaHistory, FaShoppingCart } from 'react-icons/fa';

const VentaProducto = () => {
    const [activeSection, setActiveSection] = useState('');
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [orderId, setOrderId] = useState(''); // Para el ID del pedido

    // Obtener categorías y productos desde el backend
    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products2');
                const fetchedCategories = response.data.categories;
                setCategories(fetchedCategories);

                // Establecer la primera categoría como activa por defecto
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

    const updateQuantity = (id, operation) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[id] || 0;
            const newQuantity =
                operation === 'incrementar' ? currentQuantity + 1 : Math.max(0, currentQuantity - 1);
            return { ...prevQuantities, [id]: newQuantity };
        });
    };

    const total = productsByCategory.reduce((acc, product) => {
        const quantity = quantities[product.id] || 0;
        return acc + (product.precio * quantity);
    }, 0);

    const confirmarPedido = async () => {
        const pedidoDate = {
            pedido: productsByCategory.map((product) => ({
                nombre: product.nombre,
                cantidad: quantities[product.id] || 0,
            })),
            total: `${total.toFixed(2)} BS`,
        };

        console.log("Datos del pedido:", JSON.stringify(pedidoDate, null, 2));

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/pedidos', pedidoDate);
            console.log("Respuesta del backend:", response.data);
            setOrderId(response.data.id); // Guardar el ID del pedido recibido del backend
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
            {/* Barra de Navegación */}
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

                    <section className="px-6 py-4">
                        <div className="flex justify-center space-x-4 md:space-x-8 mt-4 flex-wrap">
                            {/* Botones dinámicos para categorías */}
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

                    {/* Mostrar productos de la categoría seleccionada */}
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
                                        onClick={() => updateQuantity(product.id, 'decrementar')}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-semibold text-gray-700">{quantities[product.id] || 0}</span>
                                    <button
                                        className="w-10 h-10 text-white bg-red-500 rounded-full btn"
                                        onClick={() => updateQuantity(product.id, 'incrementar')}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>

                    <footer className="px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-red-100">
                        <div className="text-lg font-semibold text-gray-700 md:mr-auto">
                            Total: <span className="text-red-500">{total.toFixed(2)} BS</span>
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
