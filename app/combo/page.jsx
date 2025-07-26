'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { reemplazarProductoPorCategoria } from '../../app/redux/pedidosSlice'; 

const Combo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [seleccionado, setSeleccionado] = useState(null);

  const productos = useSelector((state) => state.pedido.pedido);

  useEffect(() => {
    const hayHamburguesa = productos.some((p) => p.categoria === 'hamburguesa');
    if (!hayHamburguesa) {
      router.push('/hamburguesas');
    }
  }, [productos, router]);

  const combos = [
    {
      nombre: 'Con papas fritas',
      descripcion: 'Acompañado de papas crujientes.',
      precio: 800,
      imagen: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
      categoria: 'combo',
    },
    {
      nombre: 'Con aros de cebolla',
      descripcion: 'Aros de cebolla dorados.',
      precio: 900,
      imagen: 'https://images.pexels.com/photos/28909535/pexels-photo-28909535.jpeg',
      categoria: 'combo',
    },
    {
      nombre: 'Con nachos con queso',
      descripcion: 'Nachos calientes con salsa cheddar.',
      precio: 1000,
      imagen: 'https://images.pexels.com/photos/17683812/pexels-photo-17683812.jpeg',
      categoria: 'combo',
    },
    {
      nombre: 'Con papas rústicas',
      descripcion: 'Papas con piel, crocantes y especiadas.',
      precio: 950,
      imagen: 'https://images.pexels.com/photos/8839625/pexels-photo-8839625.jpeg',
      categoria: 'combo',
    },
  ];

  const handleSeleccionar = (combo) => {
    setSeleccionado(combo);
    dispatch(
      reemplazarProductoPorCategoria({
        categoria: 'combo',
        nuevoProducto: combo,
      })
    );
  };

  const handleSiguiente = () => {
    router.push('/bebidas');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl mb-6 font-semibold text-center">Elegí tu combo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {combos.map((combo, index) => (
          <div
            key={index}
            onClick={() => handleSeleccionar(combo)}
            className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 ${
              seleccionado?.nombre === combo.nombre
                ? 'border-green-500 shadow-lg scale-105'
                : 'border-gray-300 hover:shadow'
            }`}
          >
            <img
              src={combo.imagen}
              alt={combo.nombre}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{combo.nombre}</h3>
            <p className="text-gray-600">{combo.descripcion}</p>
            <p className="font-semibold mt-2">${combo.precio}</p>
          </div>
        ))}
      </div>

      {seleccionado && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSiguiente}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition transform duration-200 z-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Combo;
