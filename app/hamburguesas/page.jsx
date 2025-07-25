'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { agregarProducto } from '../../app/redux/pedidosSlice';

const Hamburguesas = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const hamburguesas = [
    { nombre: 'Clásica', descripcion: 'Carne, lechuga y tomate.', basePrecio: 1500, imagen: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&h=350' },
    { nombre: 'Cheddar Bacon', descripcion: 'Con queso cheddar y panceta.', basePrecio: 1800, imagen: 'https://images.pexels.com/photos/2089717/pexels-photo-2089717.jpeg' },
    { nombre: 'Veggie', descripcion: 'Hamburguesa de lentejas con vegetales.', basePrecio: 1600, imagen: 'https://images.pexels.com/photos/20741663/pexels-photo-20741663.jpeg' },
    { nombre: 'Doble', descripcion: 'Doble carne, doble queso.', basePrecio: 2200, imagen: 'https://images.pexels.com/photos/32177657/pexels-photo-32177657.jpeg' },
    { nombre: 'Triple', descripcion: 'Triple carne, cheddar, panceta, cebolla.', basePrecio: 2600, imagen: 'https://images.pexels.com/photos/12325119/pexels-photo-12325119.jpeg' },
    { nombre: 'Pollo', descripcion: 'Hamburguesa crispy de pollo.', basePrecio: 1700, imagen: 'https://images.pexels.com/photos/918581/pexels-photo-918581.jpeg' },
  ];

  const tamaños = { standard: 1, mediana: 1.2, grande: 1.5 };
  const [seleccion, setSeleccion] = useState(hamburguesas.map(() => 'standard'));

  const handleCambioTamaño = (index, nuevoTamaño) => {
    const actualizado = [...seleccion];
    actualizado[index] = nuevoTamaño;
    setSeleccion(actualizado);
  };

  const handleAgregar = (burger, index) => {
    const tamaño = seleccion[index];
    const multiplicador = tamaños[tamaño];
    const precioFinal = Math.round(burger.basePrecio * multiplicador);

    const productoConTamaño = {
      ...burger,
      tamaño,
      precio: precioFinal,
      categoria: 'hamburguesa',
    };

    dispatch(agregarProducto(productoConTamaño));
    router.push('/combo');
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl mb-6 font-semibold">Elegí tu hamburguesa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hamburguesas.map((burger, index) => {
          const tamaño = seleccion[index];
          const precioFinal = Math.round(burger.basePrecio * tamaños[tamaño]);

          return (
            <div key={index} className="p-4 rounded-2xl shadow-lg hover:shadow-2xl transition bg-white">
              <img src={burger.imagen} alt={burger.nombre} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold">{burger.nombre}</h3>
              <p className="text-gray-600">{burger.descripcion}</p>

              <label className="block mt-3 text-sm font-medium text-gray-700">Tamaño:</label>
              <select
                value={tamaño}
                onChange={(e) => handleCambioTamaño(index, e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              >
                <option value="standard">Standard</option>
                <option value="mediana">Mediana (+20%)</option>
                <option value="grande">Grande (+50%)</option>
              </select>

              <p className="font-semibold mt-2">Precio: ${precioFinal}</p>
              <button
                onClick={() => handleAgregar(burger, index)}
                className="bg-black text-white px-4 py-2 rounded mt-3 hover:bg-gray-800"
              >
                Elegir
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hamburguesas;
