import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState('');

    const router = useRouter();

    const validate = () => {
        const newErrors = {};

        if (!name) newErrors.name = 'El nombre es requerido';
        if (!email) {
            newErrors.email = 'El correo es requerido';
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
            newErrors.email = 'Formato de email inválido';
        }
        if (!password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (password.length < 8) {
            newErrors.password = 'Debe tener al menos 8 caracteres';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            newErrors.password = 'Debe contener al menos una letra y un número';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            setServerMessage('');
            try {
                const response = await axios.post('http://localhost:8000/api/register', {
                    name,
                    email,
                    password,
                });

                if (response.data.message) {
                    setServerMessage('¡Usuario registrado exitosamente! Redirigiendo al inicio de sesión...');
                    setTimeout(() => {
                        router.push('/registro/Registro'); // Redirige al componente Login
                    }, 2000);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    setServerMessage(error.response.data.message || 'Hubo un problema en el registro.');
                } else {
                    setServerMessage('Error de red. Por favor, inténtalo más tarde.');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="h-screen bg-gray-100">
            <div
                className="bg-cover bg-center min-h-[90vh] flex flex-col justify-center items-center"
                style={{ backgroundImage: "url('/assets/img/fondopollo.jpg')" }}
            >
                <h1 className="text-4xl text-white text-center mb-6">Regístrate</h1>
                <div className="flex flex-col sm:flex-row items-center bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center mb-4 sm:mb-0 sm:mr-8">
                        <img
                            src="/assets/img/logopollo.png"
                            alt="Logo pollo"
                            className="w-32 h-42 object-contain mb-9"
                        />
                    </div>

                    <div className="flex flex-col w-full sm:w-80 bg-black bg-opacity-60 p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-white mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-2 rounded border text-black"
                                    placeholder="Escribe tu nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-white mb-2">
                                    Correo electrónico
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full p-2 rounded border text-black"
                                    placeholder="Escribe tu correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-white mb-2">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full p-2 rounded border text-black"
                                    placeholder="Crea una contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-white mb-2">
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="w-full p-2 rounded border text-black"
                                    placeholder="Repite tu contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 mt-6"
                                disabled={loading}
                            >
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>
                            {serverMessage && <p className={`text-sm mt-4 ${serverMessage.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>{serverMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
