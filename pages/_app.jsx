// pages/_app.jsx
import './styles/globals.css'; // Importar con la ruta correcta
import Layout from './components/Layout'; // Asegúrate de importar el componente Layout si no lo has hecho

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
