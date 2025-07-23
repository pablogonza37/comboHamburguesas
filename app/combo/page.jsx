'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePrecio } from '@/app/contexto/precioContext';

const Combo = () => {
  const router = useRouter();
  const { agregarProducto } = usePrecio();

  const combos = [
  {
    nombre: 'Con papas fritas',
    descripcion: 'Acompañado de papas crujientes.',
    precio: 800,
    imagen:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
  },
  {
    nombre: 'Con aros de cebolla',
    descripcion: 'Aros de cebolla dorados.',
    precio: 900,
    imagen:
      'https://images.pexels.com/photos/28909535/pexels-photo-28909535.jpeg',
  },
  {
    nombre: 'Con nachos con queso',
    descripcion: 'Nachos calientes con salsa cheddar.',
    precio: 1000,
    imagen:
      'https://images.pexels.com/photos/17683812/pexels-photo-17683812.jpeg',
  },
  {
    nombre: 'Con papas rústicas',
    descripcion: 'Papas con piel, crocantes y especiadas.',
    precio: 950,
    imagen:
      'https://images.pexels.com/photos/8839625/pexels-photo-8839625.jpeg',
  },
];


  const handleAgregar = (item) => {
    agregarProducto(item);
    router.push('/bebidas');
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl mb-6 font-semibold">Elegí tu combo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {combos.map((combo, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl shadow-lg hover:shadow-2xl transition bg-white"
          >
            <img
              src={combo.imagen}
              alt={combo.nombre}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{combo.nombre}</h3>
            <p className="text-gray-600">{combo.descripcion}</p>
            <p className="font-semibold mt-2">${combo.precio}</p>
            <button
              onClick={() => handleAgregar(combo)}
              className="bg-black text-white px-4 py-2 rounded mt-3 hover:bg-gray-800"
            >
              Elegir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Combo;
