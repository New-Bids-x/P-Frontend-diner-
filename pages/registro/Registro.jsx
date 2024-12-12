import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const router = useRouter();

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'El correo es requerido';
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email))
            newErrors.email = 'Formato de email inválido';

        if (!password) newErrors.password = 'La contraseña es requerida';
        else if (password.length < 8) newErrors.password = 'Debe tener al menos 8 caracteres';
        else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
            newErrors.password = 'Debe contener al menos una letra y un número';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            setServerError('');
            try {
                const response = await axios.post('http://localhost:8000/api/login', { email, password });
                const { token, user } = response.data;

                // Guarda el token y redirige
                localStorage.setItem('token', token);
                router.push('/cliente');
            } catch (error) {
                setServerError(error.response?.data?.message || 'Error de red.');
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
                <h1 className="text-4xl text-white text-center mb-6">Inicia Sesión</h1>
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
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 mt-6"
                                disabled={loading}
                            >
                                {loading ? 'Cargando...' : 'Iniciar Sesión'}
                            </button>
                            {serverError && <p className="text-red-500 text-sm mt-4">{serverError}</p>}
                            <div className="flex flex-col items-center mt-4 space-y-2">
                                <a href="/forgot-password" className="text-yellow-400 hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </a>
                                <a href="/registro/NewRegister" className="text-yellow-400 hover:underline">
                                    ¿No tienes una cuenta? ¡Regístrate!
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}






// import { useState } from 'react';
// import axios from 'axios';

// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({ email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const [serverError, setServerError] = useState('');


//     const validate = () => {
//         const newErrors = {};

//         if (!email) {
//             newErrors.email = 'El correo es requerido';
//         } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
//             newErrors.email = 'Formato de email inválido';
//         }

//         if (!password) {
//             newErrors.password = 'La contraseña es requerida';
//         } else if (password.length < 8) {
//             newErrors.password = 'Debe tener al menos 8 caracteres';
//         } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
//             newErrors.password = 'La contraseña debe contener al menos una letra y un número';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validate()) {
//             setLoading(true);
//             setServerError('');
//             try {
//                 const response = await axios.post('http://localhost:8000/api/login', {
//                     email,
//                     password,
//                 });
//                 // Puedes manejar la respuesta del backend aquí, por ejemplo, almacenando el token en el estado o localStorage
//                 console.log(response.data);  // Aquí recibes el token y mensaje de éxito
//             } catch (error) {
//                 // Manejar errores de autenticación
//                 if (error.response && error.response.data) {
//                     setServerError(error.response.data.message || 'Hubo un problema al iniciar sesión.');
//                 } else {
//                     setServerError('Error de red. Por favor, inténtalo de nuevo más tarde.');
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             console.log('Form has errors');
//         }
//     };

//     return (
//         <div className="h-screen bg-gray-100">
//             <div
//                 className="bg-cover bg-center min-h-[90vh] flex flex-col justify-center items-center"
//                 style={{ backgroundImage: "url('/assets/img/fondopollo.jpg')" }}
//             >
//                 <h1 className="text-4xl text-white text-center mb-6">Inicia Sesión</h1>
//                 <div className="flex flex-col sm:flex-row items-center bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
//                     <div className="flex flex-col items-center mb-4 sm:mb-0 sm:mr-8">
//                         <img
//                             src="/assets/img/logopollo.png"
//                             alt="Logo pollo"
//                             className="w-32 h-42 object-contain mb-9"
//                         />
//                     </div>

//                     <div className="flex flex-col w-full sm:w-80 bg-black bg-opacity-60 p-6 rounded-lg shadow-lg">
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label htmlFor="email" className="block text-white mb-2">
//                                     Correo electrónico
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="email"
//                                     className="w-full p-2 rounded border text-black"
//                                     placeholder="Escribe tu correo electrónico"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//                             </div>
//                             <div>
//                                 <label htmlFor="password" className="block text-white mb-2">
//                                     Contraseña
//                                 </label>
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     className="w-full p-2 rounded border text-black"
//                                     placeholder="Ingrese su contraseña"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 mt-6"
//                                 disabled={loading}
//                             >
//                                 {loading ? 'Cargando...' : 'Iniciar Sesión'}
//                             </button>
//                             {serverError && <p className="text-red-500 text-sm mt-4">{serverError}</p>}
//                             <div className="flex flex-col items-center mt-4 space-y-2">
//                                 <a href="/forgot-password" className="text-yellow-400 hover:underline">
//                                     ¿Olvidaste tu contraseña?
//                                 </a>
//                                 <a href="/register" className="text-yellow-400 hover:underline">
//                                     ¿No tienes una cuenta? ¡Regístrate!
//                                 </a>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }