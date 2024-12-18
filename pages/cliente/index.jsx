import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CartDropdown from '../../components/cartDropdown/CartDropdown';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Si no hay token, el usuario no está autenticado
                if (!token) {
                    console.log('Usuario no autenticado. Continuando como invitado...');
                    setUserName('Invitado');
                    return; // Salir sin intentar hacer la solicitud
                }

                // Si hay token, intentamos verificar la sesión
                const response = await axios.get('http://localhost:8000/api/check-session', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Si la solicitud fue exitosa, establecemos el nombre del usuario
                setUserName(response.data.name);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);

                // Si hay un error, el usuario se considera como invitado
                setUserName('Invitado');
            } finally {
                // Independientemente del resultado, dejamos de mostrar el loading
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);




    useEffect(() => {
        setIsMounted(true);
        setCartItems([]); // Inicializar el carrito vacío
    }, []);

    const handleMenuOptionClick = () => {
        setMenuOpen(false);
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Función para agregar productos al carrito
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...existingItem, quantity: existingItem.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };



    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products');
            console.log('Datos obtenidos del backend:', response.data);

            // Filtra los productos con categoría "2"
            const filteredProducts = Array.isArray(response.data.products)
                ? response.data.products.filter(product => product.categoria === "2")
                : [];

            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setProducts([]); // Asegura que products sea un array incluso si hay un error
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleCartDropdown = () => {
        setCartOpen(!cartOpen);
    };

    const getTotalItems = () => {
        return cartItems.length;
    };

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="/assets/img/favicon.ico" type="image/*-icon" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css" />
                <link rel="stylesheet" href="/output.css" />
                <title>Plant Website || TailwindCSS</title>
            </Head>

            <header id="navbar" className="bg-black fixed w-full top-0 left-0 z-50">
                <nav className="container flex items-center justify-between h-16 sm:h-20">
                    <div className="font-Lobster sm:text-2xl">New Bids.</div>
                    <div
                        id="nav-menu"
                        className={`absolute top-0 ${menuOpen ? 'left-0' : 'left-[-100%]'} min-h-[80vh] w-full bg-orange-400/80 backdrop-blur-sm flex items-center justify-center duration-300 lg:static lg:min-h-fit lg:bg-transparent lg:w-auto`}
                    >
                        <ul className="flex flex-col items-center gap-8 lg:flex-row">
                            <li>
                                <a href="#home" className="nav-link" onClick={handleMenuOptionClick}>Inicio</a>
                            </li>
                            <li>
                                <a href="#about" className="nav-link" onClick={handleMenuOptionClick}>Sobre Nosotros</a>
                            </li>
                            <li>
                                <a href="#review" className="nav-link" onClick={handleMenuOptionClick}>Menu</a>
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

            <main>
                <section id="home" className="relative pt-20">
                    <div className="container mx-auto px-4">
                        <div className="w-64 h-64 bg-orange-100 rounded-full blur-3xl -z-10 opacity-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <div className="flex flex-col items-center gap-5 lg:flex-row">
                        <div className="w-full space-y-5 lg:w-1/2 px-5 lg:px-10">
                            <h1>
                                <span className="text-black">Sabor</span> y calidad <br />
                                inigualable <span className="text-black">pollos</span> con <br />
                                la receta especial
                            </h1>
                            <p className="text-slate-300 font-Lobster">
                                Disfruta de una experiencia culinaria única donde cada bocado cuenta una historia!
                            </p>
                            <div className="flex flex-col gap-2 sw:flex-row md:gap-4 lg:pt-5 x1:pt-10">
                                <button className="btn bg-green-500 text-white flex items-center px-4 py-2 rounded">
                                    <span className="mr-2">Pide ya</span>
                                    <i className="ri-shopping-cart-line"></i>
                                </button>
                                <button className="btn btn_outline border-black text-white flex items-center px-4 py-2 rounded">
                                    <span className="mr-2">Ver Menu</span>
                                    <i className="ri-menu-line"></i>
                                </button>
                            </div>
                            <p className="text-xs font-Lobster text-slate-300">Entregas a tu hogar.</p>
                        </div>
                        <div className="w-full relative lg:w-1/2">
                            <Image
                                src="/assets/img/polloE.png"
                                alt="home_image"
                                layout="responsive"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </section>

                <section id="review" className="py-16 bg-gray-100">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8 bg-black">Menu</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white p-8 rounded-lg shadow-lg">
                                    <div className="cursor-pointer">
                                        <Link href="/productos/info-producto">
                                            <div className="w-full h-56 flex items-center justify-center mb-4 overflow-hidden">
                                                <Image
                                                    src={product.imagen ? `http://localhost:8000/images/${product.imagen}` : '/assets/img/default.png'}
                                                    alt={product.nombre || 'Imagen predeterminada'}
                                                    width={250}
                                                    height={250}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </Link>
                                        <h3 className="text-xl font-bold mb-2 text-black">{product.nombre}</h3>
                                        <p className="mb-4 text-black">Precio: ${product.precio}</p>
                                        <button
                                            className="btn bg-green-500 text-white"
                                            onClick={() => addToCart({ id: product.id, name: product.nombre, price: product.precio, imagen: product.imagen })}
                                        >
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">Sobre Nosotros</h2>
                        <p className="mb-8">
                            Somos una empresa dedicada a llevar sabores frescos y auténticos a cada hogar y espacio de trabajo.
                            Nuestra misión es hacer del mundo un lugar más sabroso, un plato a la vez.
                        </p>
                        <img
                            src="/assets/img/logopollo.png"
                            alt="About Us Image"
                            className="mx-auto rounded-lg shadow-lg w-1/2 sm:w-1/3 md:w-1/4"
                        />
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;

