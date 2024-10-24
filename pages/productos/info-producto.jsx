import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductInfo() {
    return (
        <div className="bg-gray-50 min-h-screen flex justify-center items-center">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg mt-8 p-6">
                {/* Encabezado del producto */}
                <div className="flex items-center space-x-6">
                    <Image
                        src="/assets/img/polloE.png"
                        alt="Hamburguesa BBQ"
                        width={80}
                        height={80}
                        className="rounded-full shadow-md"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Pollo BBQ</h2>
                        <p className="text-orange-400">Pídelo ya</p>
                    </div>
                </div>

                {/* Botón para pedir */}
                <div className="mt-6 text-center">
                    <button
                        className="bg-orange-400 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-300 transition-all duration-300 shadow-lg">
                        PEDIR
                        <i className="ri-arrow-right-s-line ml-2"></i>
                    </button>
                </div>

                {/* Navegación de productos relacionados */}
                <div className="flex justify-between mt-8 border-t pt-6">
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-gray-800">Pollo BBQ</h3>
                        <p className="text-gray-400">Con variedad de quesos</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-gray-800">Pollo BBQ</h3>
                        <p className="text-gray-400">Con más vegetales nutritivos</p>
                    </div>
                </div>

                {/* Detalles del producto */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800">Detalles de "Pollo BBQ"</h3>
                    <p className="text-gray-600 mt-2">
                        <strong>Pan:</strong> Generalmente se utiliza papa con ajonjolí o sin él, con una textura suave.
                        Se compone de una presa de pollo jugosos y crocante.
                    </p>
                    <p className="text-gray-600 mt-2">
                        <strong>Carne:</strong> El ingrediente principal es el pollo especial.
                    </p>
                </div>

                {/* Botón de agregar */}
                <div className="flex justify-end mt-4">
                    <button
                        className="flex items-center bg-orange-400 text-white px-5 py-2 rounded-lg hover:bg-orange-300 transition-all duration-300 shadow-lg">
                        Ver mas
                        <i className="ri-add-line ml-2"></i>
                    </button>
                </div>

                {/* Ingredientes adicionales */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800">Ingredientes</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {/* Primer ingrediente */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/assets/img/fide.png"
                                alt="Ingrediente 1"
                                width={200}
                                height={150}
                                className="rounded-lg"
                            />
                            <p className="mt-2 text-center text-gray-700">Cebolla Caramelizada</p>
                        </div>
                        {/* Segundo ingrediente */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/assets/img/fideo.png"
                                alt="Ingrediente 2"
                                width={200}
                                height={150}
                                className="rounded-lg"
                            />
                            <p className="mt-2 text-center text-gray-700">Pollo especial</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/assets/img/ingrediente6.png"
                                alt="Ingrediente 2"
                                width={200}
                                height={150}
                                className="rounded-lg"
                            />
                            <p className="mt-2 text-center text-gray-700">Pollo especial</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/assets/img/ingrediente6.png"
                                alt="Ingrediente 2"
                                width={200}
                                height={150}
                                className="rounded-lg"
                            />
                            <p className="mt-2 text-center text-gray-700">Pollo especial</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/assets/img/ingrediente5.png"
                                alt="Ingrediente 2"
                                width={200}
                                height={150}
                                className="rounded-lg"
                            />
                            <p className="mt-2 text-center text-gray-700">Pollo especial</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
