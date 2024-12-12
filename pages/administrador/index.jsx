import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Importa el componente Link
import CartDropdown from '../../components/cartDropdown/CartDropdown';

export default function HomeAdm() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems([
            { id: 1, name: 'Producto A', price: '50.00', image: '/assets/img/polloE.png' },
            { id: 2, name: 'Producto B', price: '75.00', image: '/assets/img/polloE.png' },
            { id: 3, name: 'Producto C', price: '100.00', image: '/assets/img/polloE.png' },
        ]);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleCartDropdown = () => setCartOpen(!cartOpen);
    const getTotalItems = () => cartItems.length;
    const handleMenuOptionClick = () => setMenuOpen(false);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Control de Ventas</title>
                <link rel="shortcut icon" href="/assets/img/favicon.ico" type="image/*-icon" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css" />
                <link rel="stylesheet" href="/output.css" />
            </Head>

            <header id="navbar" className="bg-black fixed w-full top-0 left-0 z-50">
                <nav className="container flex items-center justify-between h-16 sm:h-20">
                    <div className="text-white font-bold text-xl">Control de Ventas</div>

                    <div
                        id="nav-menu"
                        className={`absolute top-0 ${menuOpen ? 'left-0' : 'left-[-100%]'} min-h-[80vh] w-full bg-red-800/80 backdrop-blur-sm flex items-center justify-center duration-300 lg:static lg:min-h-fit lg:bg-transparent lg:w-auto`}
                    >
                        <ul className="flex flex-col items-center gap-8 lg:flex-row">
                            <li>
                                <Link href="#inicio">
                                    <span className="nav-link text-white hover:text-red-300" onClick={handleMenuOptionClick}>Inicio</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#productos">
                                    <span className="nav-link text-white hover:text-red-300" onClick={handleMenuOptionClick}>Balance Económico</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/administrador/subirproducto/SubirProducto">
                                    <span className="nav-link text-white hover:text-red-300" onClick={handleMenuOptionClick}>Crear Productos</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#clientes">
                                    <span className="nav-link text-white hover:text-red-300" onClick={handleMenuOptionClick}>Inventario</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/administrador/kitchen">
                                    <span className="nav-link text-white hover:text-red-300" onClick={handleMenuOptionClick}>Pedidos</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#reportes">
                                    <span className="nav-link text-white hover:text-red-300" onClick={handleMenuOptionClick}>Reportes y Predicciones</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        toggleCartDropdown();
                                        handleMenuOptionClick();
                                    }}
                                    className="text-white bg-yellow-500 px-4 py-2 rounded relative"
                                >
                                    <i className="ri-shopping-cart-line"></i>
                                    {getTotalItems() > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </button>
                                {cartOpen && <CartDropdown items={cartItems} />}
                            </li>
                        </ul>
                    </div>

                    <div
                        className="text-xl sm:text-3xl cursor-pointer z-50 lg:hidden"
                        onClick={toggleMenu}
                    >
                        <i className={`ri-${menuOpen ? 'close-line' : 'menu-4-line'}`} id="hamburger"></i>
                    </div>
                </nav>
            </header>

            <main className="pt-20">
                {/* Sección de Inicio */}
                <section id="inicio" className="py-16 bg-red-200 text-center">
                    <h1 className="text-4xl font-bold text-red-900 mb-4">Bienvenido al Sistema de Control de Ventas</h1>
                    <p className="text-lg text-red-700">
                        Administra tus productos, predice tus ventas y reportes de ventas de manera eficiente.
                    </p>
                    <Link href="/administrador/ventaProducto/VentaProducto">
                        <button className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-400">
                            Comenzar
                        </button>
                    </Link>
                </section>

                {/* Sección de Productos */}
                <section id="productos" className="py-16 text-center">
                    <h2 className="text-3xl font-bold text-red-900 mb-8">Gestión de Productos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
                                <Image src={item.image} alt={item.name} width={200} height={200} className="mx-auto rounded-lg" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                                <p className="text-gray-800 font-bold mt-4">Precio: ${item.price}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sección de Clientes */}
                <section id="clientes" className="py-16 bg-red-200 text-center">
                    <h2 className="text-3xl font-bold text-red-900 mb-8">Inventario</h2>
                    <p className="text-lg text-red-700">
                        Administra la información de tus clientes para mejorar el servicio y seguimiento.
                    </p>
                </section>

                {/* Sección de Reportes */}
                <section id="reportes" className="py-16 text-center">
                    <h2 className="text-3xl font-bold text-red-900 mb-8">Reportes y Predicciones de Ventas</h2>
                    <p className="text-lg text-red-700">
                        Genera reportes detallados para analizar el rendimiento de tu negocio.
                    </p>
                    <Link href="/administrador/grafico/grafico">
                        <button className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-400">
                            Verificar
                        </button>
                    </Link>
                </section>
            </main>

            <footer className="bg-red-900 py-8 text-white text-center">
                <p>&copy; 2024 Control de Ventas. Todos los derechos reservados.</p>
                <div className="mt-4 flex justify-center space-x-4">
                    <a href="#" className="hover:text-red-300"><i className="ri-facebook-fill"></i></a>
                    <a href="#" className="hover:text-red-300"><i className="ri-twitter-fill"></i></a>
                    <a href="#" className="hover:text-red-300"><i className="ri-instagram-line"></i></a>
                    <a href="#" className="hover:text-red-300"><i className="ri-linkedin-fill"></i></a>
                </div>
            </footer>

            <a href="#navbar" className="fixed bottom-4 right-4 bg-red-900 text-white p-4 rounded-full shadow-lg hover:bg-red-700">
                <i className="ri-arrow-up-s-line"></i>
            </a>
        </>
    );
}

