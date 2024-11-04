// src/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={styles.navbar}>
            <Link href="/">Inicio</Link>
            <Link href="/cliente">Ventas (Cliente)</Link>
            <Link href="/administrador">Inventario (Administrador)</Link>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        gap: '15px',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
};
