// pages/_app.jsx
import '../styles/globals.css';
import Layout from '../components/Layout';
import { NavbarProvider } from '../context/NavbarContext';

export default function App({ Component, pageProps }) {
    return (
        <NavbarProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NavbarProvider>
    );
}
