import Link from 'next/link';
import Layout from '../components/Layout';
import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import { FaUser, FaUserShield } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

export default function Home() {
    const [ref, bounds] = useMeasure({ scroll: false });
    const [isHover, setIsHover] = useState(false);
    const [isPress, setIsPress] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [message, setMessage] = useState('');

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/test-connection', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setMessage(data.message);

                // Mostrar el mensaje en consola si la conexión es exitosa
                console.log('Mensaje desde el backend:', data.message);
            } catch (error) {
                setMessage('Error en la conexión');
                console.error('Error en la conexión:', error);
            }
        };

        testConnection();
    }, []);

    return (
        <Layout>
            <div
                className="flex flex-col items-center justify-center h-screen w-full bg-no-repeat bg-cover bg-center fixed inset-0"
                style={{ backgroundImage: "url('/assets/img/fondopollo.jpg')" }}
            >
                <motion.button
                    ref={ref}
                    initial={false}
                    animate={isHover ? "hover" : "rest"}
                    whileTap="press"
                    variants={{
                        rest: { scale: 3.5 },
                        hover: { scale: 1.5, rotate: 50 },
                        press: { scale: 1.4, rotate: 0 }
                    }}
                    onHoverStart={() => {
                        resetMousePosition();
                        setIsHover(true);
                    }}
                    onHoverEnd={() => {
                        resetMousePosition();
                        setIsHover(false);
                    }}
                    onTapStart={() => setIsPress(true)}
                    onTap={() => setIsPress(false)}
                    onTapCancel={() => setIsPress(false)}
                    onPointerMove={(e) => {
                        mouseX.set(e.clientX - bounds.x - bounds.width / 2);
                        mouseY.set(e.clientY - bounds.y - bounds.height / 2);
                    }}
                    className="relative p-6 rounded-lg shadow-xl border-2 border-white flex items-center justify-center bg-yellow-300"
                >
                    <img
                        src="/assets/img/logopollo.png"
                        alt="Pierna de Pollo"
                        className="w-32 h-auto object-cover transition-transform duration-300"
                    />
                </motion.button>

                <p className="text-lg text-white mb-8 text-center">
                    .
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16"> {/* Aumenta gap para mayor separación */}
                    <Link href="/cliente">
                        <motion.div
                            whileHover={{ scale: 1.1, rotateY: 10 }}
                            transition={{ duration: 0.2 }}
                            className="relative flex flex-col items-center p-8 rounded-xl shadow-2xl hover:shadow-2xl transition transform cursor-pointer border-4 border-white overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF4500 100%)'
                            }}
                        >
                            <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-yellow-400/50 to-orange-600/50"></div>
                            <div className="relative z-10 flex flex-col items-center space-y-4">
                                <FaUser className="text-white text-4xl mb-4" /> {/* Ícono de cliente */}

                                <h3 className="text-2xl font-bold text-white mb-2 text-shadow">
                                    Ir a Ventas (Cliente)
                                </h3>
                                <p className="text-white text-center font-medium">
                                    Accede a las herramientas de ventas para gestionar transacciones de cliente.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/administrador">
                        <motion.div
                            whileHover={{ scale: 1.1, rotateY: -10 }}
                            transition={{ duration: 0.2 }}
                            className="relative flex flex-col items-center p-8 rounded-xl shadow-2xl hover:shadow-2xl transition transform cursor-pointer border-4 border-white overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)'
                            }}
                        >
                            <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-amber-700/50 to-brown-900/50"></div>
                            <div className="relative z-10 flex flex-col items-center space-y-4">
                                <FaUserShield className="text-white text-4xl mb-4" /> {/* Ícono de administrador */}

                                <h3 className="text-2xl font-bold text-white mb-2 text-shadow">
                                    Ir a Inventario (Administrador)
                                </h3>
                                <p className="text-white text-center font-medium">
                                    Gestiona el inventario y controla los productos disponibles en el sistema.
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}


// import Head from 'next/head';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import CartDropdown from './components/cartDropdown/CartDropdown';
// import Link from 'next/link';
// const Home = () => {
//     const [isMounted, setIsMounted] = useState(false);
//     const [cartOpen, setCartOpen] = useState(false);
//     const [cartItems, setCartItems] = useState([]);

//     const [menuOpen, setMenuOpen] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//         // Inicializar el carrito vacío
//         setCartItems([]);
//     }, []);

//     // const toggleCartDropdown = () => setCartOpen(!cartOpen);
//     // const getTotalItems = () =>
//     //     cartItems.reduce((total, item) => total + item.quantity, 0);

//     const handleMenuOptionClick = () => {
//         setMenuOpen(false);
//     };

//     const toggleMenu = () => setMenuOpen(!menuOpen);



//     // Función para agregar productos al carrito
//     const addToCart = (item) => {
//         setCartItems((prevItems) => {
//             const existingItem = prevItems.find(i => i.id === item.id);
//             if (existingItem) {
//                 return prevItems.map(i =>
//                     i.id === item.id ? { ...existingItem, quantity: existingItem.quantity + 1 } : i
//                 );
//             }
//             return [...prevItems, { ...item, quantity: 1 }];
//         });
//     };


//     useEffect(() => {
//         setCartItems([ // Inicializar el carrito con algunos productos de ejemplo
//             { id: 1, name: 'Pollo Asado', price: '10.00', image: '/assets/img/polloE.png' },
//             { id: 2, name: 'Pollo Asado', price: '5.00', image: '/assets/img/polloE.png' },
//             { id: 3, name: 'Pollo Asado', price: '10.00', image: '/assets/img/polloE.png' },
//         ]);
//     }, []);

//     const toggleCartDropdown = () => {
//         setCartOpen(!cartOpen);
//     };

//     const getTotalItems = () => {
//         return cartItems.length;
//     };


//     return (
//         <>
//             <Head>
//                 <meta charSet="UTF-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <link rel="shortcut icon" href="/assets/img/favicon.ico" type="image/*-icon" />
//                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css" />
//                 <link rel="stylesheet" href="/output.css" />
//                 <title>Plant Website || TailwindCSS</title>
//             </Head>

//             <header id="navbar" className="bg-black fixed w-full top-0 left-0 z-50">
//                 <nav className="container flex items-center justify-between h-16 sm:h-20">
//                     <div className="font-Lobster sm:text-2xl">New Bids.</div>

//                     <div
//                         id="nav-menu"
//                         className={`absolute top-0 ${menuOpen ? 'left-0' : 'left-[-100%]'} min-h-[80vh] w-full bg-orange-400/80 backdrop-blur-sm flex items-center justify-center duration-300 lg:static lg:min-h-fit lg:bg-transparent lg:w-auto`}
//                     >
//                         <ul className="flex flex-col items-center gap-8 lg:flex-row">
//                             <li>
//                                 <a href="#home" className="nav-link" onClick={handleMenuOptionClick}>Inicio</a>
//                             </li>
//                             <li>
//                                 <a href="#about" className="nav-link" onClick={handleMenuOptionClick}>Sobre Nosotros</a>
//                             </li>

//                             <li>
//                                 <a href="#review" className="nav-link" onClick={handleMenuOptionClick}>Menu</a>
//                             </li>
//                             <li>
//                                 <button
//                                     onClick={() => {
//                                         toggleCartDropdown();
//                                         handleMenuOptionClick();
//                                     }}
//                                     className="text-white bg-yellow-500 px-4 py-2 rounded relative"
//                                 >
//                                     <i className="ri-shopping-cart-line"></i>
//                                     {getTotalItems() > 0 && (
//                                         <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
//                                             {getTotalItems()}
//                                         </span>
//                                     )}
//                                 </button>
//                                 {cartOpen && <CartDropdown items={cartItems} />}
//                             </li>
//                         </ul>
//                     </div>

//                     <div
//                         className="text-xl sm:text-3xl cursor-pointer z-50 lg:hidden"
//                         onClick={toggleMenu}
//                     >
//                         <i className={`ri-${menuOpen ? 'close-line' : 'menu-4-line'}`} id="hamburger"></i>
//                     </div>
//                 </nav>
//             </header>

//             <main>
//                 <section id="home" className="relative pt-20">
//                     <div className="container mx-auto px-4">
//                         <div className="w-64 h-64 bg-orange-100 rounded-full blur-3xl -z-10 opacity-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
//                     </div>
//                     <div className="flex flex-col items-center gap-5 lg:flex-row">
//                         <div className="w-full space-y-5 lg:w-1/2 px-5 lg:px-10">
//                             <h1>
//                                 <span className="text-black">Sabor</span> y calidad <br />
//                                 inigualable <span className="text-black">pollos</span> con <br />
//                                 la receta especial
//                             </h1>
//                             <p className="text-slate-300 font-Lobster">
//                                 Disfruta de una experiencia culinaria única donde cada bocado cuenta una historia!
//                             </p>
//                             <div className="flex flex-col gap-2 sw:flex-row md:gap-4 lg:pt-5 x1:pt-10">
//                                 <button className="btn bg-green-500 text-white flex items-center px-4 py-2 rounded">
//                                     <span className="mr-2">Pide ya</span>
//                                     <i className="ri-shopping-cart-line"></i>
//                                 </button>

//                                 <button className="btn btn_outline border-black text-white flex items-center px-4 py-2 rounded">
//                                     <span className="mr-2">Ver Menu</span>
//                                     <i className="ri-menu-line"></i>
//                                 </button>
//                             </div>
//                             <p className="text-xs font-Lobster text-slate-300">Entregas a tu hogar.</p>
//                         </div>
//                         <div className="w-full relative lg:w-1/2">
//                             <Image
//                                 src="/assets/img/polloE.png"
//                                 alt="home_image"
//                                 layout="responsive"
//                                 width={500}
//                                 height={500}
//                             />
//                         </div>
//                     </div>
//                 </section>



//                 <section id="review" className="py-16 bg-gray-100">
//                     <div className="container mx-auto px-4 text-center">
//                         <h2 className="text-3xl font-bold mb-8 bg-black">Menu</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                             <div className="bg-white p-8 rounded-lg shadow-lg">
//                                 <Link href="/productos/info-producto" passHref>
//                                     <div className="cursor-pointer">
//                                         <Image
//                                             src="/assets/img/polloE.png"
//                                             alt="Pollo Asado"
//                                             className="mx-auto rounded-lg shadow-lg"
//                                             width={200}
//                                             height={200}
//                                         />
//                                         <h3 className="text-xl font-bold mb-2 text-black">Pollo Asado</h3>
//                                         <p className="mb-4 text-black">Precio: $10.00</p>
//                                         <button
//                                             className="btn bg-green-500 text-white"
//                                             onClick={() => addToCart({ name: 'Pollo Asado', price: '10.00' })}
//                                         >
//                                             Comprar
//                                         </button>
//                                     </div>
//                                 </Link>
//                             </div>

//                             <div className="bg-white p-8 rounded-lg shadow-lg">
//                                 <Link href="/productos/info-producto" passHref>
//                                     <div className="cursor-pointer">
//                                         <Image
//                                             src="/assets/img/polloE.png"
//                                             alt="Pollo Asado"
//                                             className="mx-auto rounded-lg shadow-lg"
//                                             width={200}
//                                             height={200}
//                                         />
//                                         <h3 className="text-xl font-bold mb-2 text-black">Pollo Asado</h3>
//                                         <p className="mb-4 text-black">Precio: $10.00</p>
//                                         <button
//                                             className="btn bg-green-500 text-white"
//                                             onClick={() => addToCart({ name: 'Pollo Asado', price: '10.00' })}
//                                         >
//                                             Comprar
//                                         </button>
//                                     </div>
//                                 </Link>
//                             </div>

//                             <div className="bg-white p-8 rounded-lg shadow-lg">
//                                 <Link href="/productos/info-producto" passHref>
//                                     <div className="cursor-pointer">
//                                         <Image
//                                             src="/assets/img/polloE.png"
//                                             alt="Pollo Asado"
//                                             className="mx-auto rounded-lg shadow-lg"
//                                             width={200}
//                                             height={200}
//                                         />
//                                         <h3 className="text-xl font-bold mb-2 text-black">Pollo Asado</h3>
//                                         <p className="mb-4 text-black">Precio: $10.00</p>
//                                         <button
//                                             className="btn bg-green-500 text-white"
//                                             onClick={() => addToCart({ name: 'Pollo Asado', price: '10.00' })}
//                                         >
//                                             Comprar
//                                         </button>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 {/* Sección Sobre Nosotros */}
//                 <section id="about" class="py-16">
//                     <div class="container mx-auto px-4 text-center">
//                         <h2 class="text-3xl font-bold mb-8">Sobre Nosotros</h2>
//                         <p class="mb-8">
//                             Somos una empresa dedicada a llevar sabores frescos y auténticos a cada hogar y espacio de trabajo.
//                             Nuestra misión es hacer del mundo un lugar más sabroso, un plato a la vez. Ya sea que busques
//                             disfrutar de un delicioso pollo especial o crear un menú memorable, contamos con la experiencia para
//                             ayudarte a lograrlo.
//                         </p>
//                         <img
//                             src="/assets/img/logopollo.png"
//                             alt="About Us Image"
//                             class="mx-auto rounded-lg shadow-lg w-1/2 sm:w-1/3 md:w-1/4"
//                         />
//                     </div>
//                 </section>

//             </main >

//             <footer className="py-8 bg-black text-white">
//                 <div className="container mx-auto px-4 text-center">
//                     <h3 className="text-2xl font-bold mb-4">Regístrate</h3>
//                     <form className="mb-8 text-black">
//                         <input type="email" placeholder="Ingrese su email" className="p-2 rounded-l-lg" />
//                         <button type="submit" className="p-2 bg-orange-400 rounded-r-lg">Registrarse</button>
//                     </form>
//                     <p>&copy; 2024 Proyecto Programación Web. Todos los derechos reservados.</p>
//                 </div>
//             </footer>
//         </>
//     );
// };

// export default Home;