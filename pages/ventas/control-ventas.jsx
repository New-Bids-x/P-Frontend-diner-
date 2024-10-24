import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function HomeAdm() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Control de Ventas</title>
                {/* Favicon */}
                <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon" />
                {/* Remix Icons */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css" />
                {/* Tailwind CSS */}
                <link rel="stylesheet" href="/output.css" />
            </Head>

            {/* Header */}
            <header className="bg-red-900 fixed w-full z-50">
                <nav className="container mx-auto flex items-center justify-between h-16">
                    <div className="text-white font-bold text-xl">Control de Ventas</div>
                    <div className="hidden lg:flex space-x-6">
                        <a href="#inicio" className="text-white hover:text-red-300">Inicio</a>
                        <a href="#productos" className="text-white hover:text-red-300">Balance Económico</a>
                        <a href="#clientes" className="text-white hover:text-red-300">Inventario</a>
                        <a href="#reportes" className="text-white hover:text-red-300">Reportes y Predicciones</a>
                    </div>
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-white text-3xl">
                            <i className="ri-menu-line"></i>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Sidebar para móvil */}
            {menuOpen && (
                <div className="fixed inset-0 bg-red-900/80 backdrop-blur-sm z-40">
                    <nav className="flex flex-col items-center justify-center space-y-8 h-full text-white">
                        <a href="#inicio" className="text-xl">Inicio</a>
                        <a href="#productos" className="text-xl">Productos</a>
                        <a href="#clientes" className="text-xl">Clientes</a>
                        <a href="#reportes" className="text-xl">Reportes</a>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="pt-20">
                {/* Sección de Inicio */}
                <section id="inicio" className="py-16 bg-red-200">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-bold text-red-900 mb-4">Bienvenido al Sistema de Control de Ventas</h1>
                        <p className="text-lg text-red-700">
                            Administra tus productos, predice tus ventas y reportes de ventas de manera eficiente.
                        </p>
                        <div className="mt-6">
                            <button className="bg-red-900 text-white px-6 py-2 rounded-full hover:bg-red-700">Comenzar</button>
                        </div>
                    </div>
                </section>

                {/* Sección de Productos */}
                <section id="productos" className="py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-red-900 mb-8">Gestión de Productos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Producto 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Producto A</h3>
                                <p className="text-gray-600">Descripción breve del producto.</p>
                                <p className="text-gray-800 font-bold mt-4">Precio: $50.00</p>
                            </div>
                            {/* Producto 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Producto B</h3>
                                <p className="text-gray-600">Descripción breve del producto.</p>
                                <p className="text-gray-800 font-bold mt-4">Precio: $75.00</p>
                            </div>
                            {/* Producto 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Producto C</h3>
                                <p className="text-gray-600">Descripción breve del producto.</p>
                                <p className="text-gray-800 font-bold mt-4">Precio: $100.00</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección de Clientes */}
                <section id="clientes" className="py-16 bg-red-200">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-red-900 mb-8">Inventario</h2>
                        <p className="text-lg text-red-700 mb-6">
                            Administra la información de tus clientes para mejorar el servicio y seguimiento.
                        </p>
                        <div className="flex justify-center">
                            <button className="bg-red-900 text-white px-6 py-2 rounded-full hover:bg-red-700">Ver Inventario</button>
                        </div>
                    </div>
                </section>

                {/* Sección de Reportes */}
                <section id="reportes" className="py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-red-900 mb-8">Reportes y Predicciones de Ventas</h2>
                        <p className="text-lg text-red-700 mb-6">
                            Genera reportes detallados para analizar el rendimiento de tu negocio.
                        </p>
                        <div className="flex justify-center">
                            <button className="bg-red-900 text-white px-6 py-2 rounded-full hover:bg-red-700">Generar Reporte</button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-red-900 py-8 text-white text-center">
                <div className="container mx-auto">
                    <p>&copy; 2024 Control de Ventas. Todos los derechos reservados.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <a href="#" className="hover:text-red-300"><i className="ri-facebook-fill"></i></a>
                        <a href="#" className="hover:text-red-300"><i className="ri-twitter-fill"></i></a>
                        <a href="#" className="hover:text-red-300"><i className="ri-instagram-line"></i></a>
                        <a href="#" className="hover:text-red-300"><i className="ri-linkedin-fill"></i></a>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top */}
            <a href="#navbar" className="fixed bottom-4 right-4 bg-red-900 text-white p-4 rounded-full shadow-lg hover:bg-red-700">
                <i className="ri-arrow-up-s-line"></i>
            </a>
        </>
    );
}
