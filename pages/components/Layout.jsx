// components/Layout.jsx
import Image from 'next/image';
import Link from 'next/link'; // Asegúrate de importar el componente Link

export default function Layout({ children }) {
    return (
        <>
            <header id="navbar" className="bg-black fixed w-full top-0 left-0 z-50">
                <nav className="container flex items-center justify-between h-16 sm:h-20">
                    <div className="font-Lobster sm:text-2xl">New Bids.</div>
                    <div
                        id="nav-menu"
                        className="absolute top-0 left-[-100%] min-h-[80vh] w-full bg-orange-400/80 backdrop-blur-sm flex items-center justify-center duration-300 overflow-hidden lg:static lg:min-h-fit lg:bg-transparent lg:w-auto"
                    >
                        <ul className="flex flex-col items-center gap-8 lg:flex-row">
                            {/* Enlaces relevantes para el dueño */}
                            <li>
                                <Link href="/" className="nav-link">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/ventas/control-ventas" className="nav-link">Control de Ventas</Link>
                            </li>
                            <li>
                                <Link href="#about" className="nav-link">Sobre Nosotros</Link>
                            </li>
                            {/* Puedes agregar o quitar más elementos según lo que quieras mostrar */}
                        </ul>
                        <div className="absolute bottom-0 -right-10 opacity-90 lg:hidden">
                            <Image src="/assets/img/leaf-1.png" alt="leaf_image" width={128} height={128} />
                        </div>
                        <div className="absolute -top-5 left-5 rotate-90 opacity-90 lg:hidden">
                            <Image src="/assets/img/leaf-2.png" alt="leaf_image" width={128} height={128} />
                        </div>
                    </div>
                    <div className="text-xl sm:text-3xl cursor-pointer z-50 lg:hidden">
                        <i className="ri-menu-4-line" id="hamburger"></i>
                    </div>
                </nav>
            </header>

            {/* Contenido de la página */}
            <main className="pt-20">{children}</main>
        </>
    );
}