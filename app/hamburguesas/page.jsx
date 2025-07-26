'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { reemplazarProductoPorCategoria } from '../../app/redux/pedidosSlice';

const Hamburguesas = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [seleccionada, setSeleccionada] = useState(null);
  const [tamano, setTamano] = useState('');

  const hamburguesas = [
    {
      nombre: 'Clásica',
      descripcion: 'Carne, lechuga y tomate.',
      imagen: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
      categoria: 'hamburguesa',
      basePrecio: 1500,
    },
    {
      nombre: 'Cheddar',
      descripcion: 'Carne, cheddar y panceta.',
      imagen: 'https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg',
      categoria: 'hamburguesa',
      basePrecio: 1700,
    },
    {
      nombre: 'Veggie',
      descripcion: 'Medallón vegetal y vegetales.',
      imagen: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg',
      categoria: 'hamburguesa',
      basePrecio: 1600,
    },
  ];

  const calcularPrecio = (base, tam) => {
    if (tam === 'doble') return Math.round(base * 1.2);
    if (tam === 'triple') return Math.round(base * 1.5);
    return base;
  };

  const handleSeleccion = (item) => {
    setSeleccionada(item);
    setTamano('');
  };

  const handleSeleccionTamano = (t) => {
    setTamano(t);
    const precioFinal = calcularPrecio(seleccionada.basePrecio, t);

    dispatch(
      reemplazarProductoPorCategoria({
        categoria: 'hamburguesa',
        nuevoProducto: {
          nombre: `${seleccionada.nombre} (${t})`,
          precio: precioFinal,
          categoria: 'hamburguesa',
          imagen: seleccionada.imagen,
        }
      })
    );
  };

  const handleSiguiente = () => {
    router.push('/combo');
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Elegí tu hamburguesa</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hamburguesas.map((item) => (
          <div
            key={item.nombre}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 shadow ${
              seleccionada?.nombre === item.nombre ? 'border-green-500 shadow-md scale-105' : 'border-gray-300'
            }`}
            onClick={() => handleSeleccion(item)}
          >
            <img src={item.imagen} alt={item.nombre} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="text-xl font-semibold">{item.nombre}</h3>
            <p className="text-gray-600 mb-2">{item.descripcion}</p>
            <p className="text-gray-800 font-medium">Desde ${item.basePrecio}</p>
          </div>
        ))}
      </div>

      {seleccionada && (
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-3">Elegí el tamaño</h3>
          <div className="flex gap-4 justify-center">
            {['individual', 'doble', 'triple'].map((t) => (
              <button
                key={t}
                onClick={() => handleSeleccionTamano(t)}
                className={`px-4 py-2 rounded border font-medium transition ${
                  tamano === t
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)} (${calcularPrecio(seleccionada.basePrecio, t)})
              </button>
            ))}
          </div>
        </div>
      )}

      {tamano && (
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

export default Hamburguesas;
