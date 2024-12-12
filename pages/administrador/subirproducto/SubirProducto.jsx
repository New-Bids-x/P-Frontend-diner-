import { useState, useEffect } from 'react';

const SubirProducto = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [mostrarFormularioCategoria, setMostrarFormularioCategoria] = useState(false);

    // Obtener categorías desde el backend
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/categories');
                const data = await response.json();
                setCategorias(data.categories);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 500;
                    canvas.height = 500;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob(
                        (blob) => {
                            setImagen(blob);
                            setImagenPreview(URL.createObjectURL(blob));
                        },
                        file.type,
                        1
                    );
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegistrarCategoria = async () => {
        if (categorias.some(cat => cat.nombre.toLowerCase() === nuevaCategoria.toLowerCase())) {
            setMensaje('La categoría ya existe.');
            setShowAlert(true);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: nuevaCategoria }),
            });

            if (response.ok) {
                const data = await response.json();
                setCategorias((prevCategorias) => [...prevCategorias, data.category]);
                setNuevaCategoria('');
                setMostrarFormularioCategoria(false);
                setMensaje('¡Categoría registrada exitosamente!');
                setShowAlert(true);
            } else {
                const data = await response.json();
                setMensaje(`Error al registrar categoría: ${data.error}`);
                setShowAlert(true);
            }
        } catch (error) {
            setMensaje('Error al registrar categoría');
            setShowAlert(true);
            console.error('Error al registrar categoría:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('imagen', imagen);
        formData.append('categoria', categoriaSeleccionada);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/products', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMensaje('¡Producto registrado exitosamente!');
                setShowAlert(true);
                setNombre('');
                setPrecio('');
                setImagen(null);
                setImagenPreview(null);
                setCategoriaSeleccionada('');
            } else {
                const data = await response.json();
                setMensaje(`Error al guardar el producto: ${data.error}`);
                setShowAlert(true);
            }
        } catch (error) {
            setMensaje('Error al guardar el producto');
            setShowAlert(true);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registrar Producto</h2>
                {showAlert && (
                    <div
                        className={`p-4 mb-4 rounded-lg shadow ${mensaje.includes('exitosamente') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                        <h3 className="text-lg font-medium mb-2">{mensaje}</h3>
                        <button
                            className="mt-4 px-4 py-2 bg-white hover:bg-gray-200 rounded-md text-gray-800"
                            onClick={() => setShowAlert(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Nombre del Producto</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej. Pollo a la canasta"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Precio</label>
                        <input
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            placeholder="Ej. 200.00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Categoría</label>
                        <div className="flex items-center gap-2">
                            <select
                                value={categoriaSeleccionada}
                                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                                className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setMostrarFormularioCategoria(!mostrarFormularioCategoria)}
                                className="px-4 py-2 bg-blue-950 text-black ounded-md hover:bg-blue-600"
                            >
                                {mostrarFormularioCategoria ? 'Cancelar' : 'Nueva'}
                            </button>
                        </div>
                    </div>
                    {mostrarFormularioCategoria && (
                        <div className="mt-4">
                            <label className="block text-gray-700 font-semibold mb-1">Nueva Categoría</label>
                            <input
                                type="text"
                                value={nuevaCategoria}
                                onChange={(e) => setNuevaCategoria(e.target.value)}
                                placeholder="Ej. Carnes"
                                className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={handleRegistrarCategoria}
                                className="text-black mt-2 px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 "
                            >
                                Registrar Categoría
                            </button>
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Imagen</label>
                        <input
                            type="file"
                            onChange={handleImagenChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            accept="image/*"
                        />
                        {imagenPreview && (
                            <div className="mt-4">
                                <p className="text-gray-700 font-semibold mb-1">Vista previa:</p>
                                <div className="w-24 h-24 border rounded-md overflow-hidden">
                                    <img
                                        src={imagenPreview}
                                        alt="Vista previa de imagen"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="text-white w-full bg-black rounded-md hover:bg-green-600  font-bold py-2 px-4 rounded-md"
                    >
                        Registrar Producto
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubirProducto;
