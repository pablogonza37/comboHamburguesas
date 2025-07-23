'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePrecio } from '@/app/contexto/precioContext';

const Bebidas = () => {
  const router = useRouter();
  const { agregarProducto } = usePrecio();

 const bebidas = [
  {
    nombre: 'Coca-Cola 500ml',
    descripcion: 'Clásica y refrescante.',
    precio: 600,
    imagen:
      'https://fratalmacenar.vtexassets.com/arquivos/ids/156126-800-auto?v=638358478554870000&width=800&height=auto&aspect=true',
  },
  {
    nombre: 'Agua sin gas',
    descripcion: 'Natural y ligera.',
    precio: 500,
    imagen:
      'https://images.pexels.com/photos/30762213/pexels-photo-30762213.jpeg',
  },
  {
    nombre: 'Limonada',
    descripcion: 'Con menta y limón.',
    precio: 750,
    imagen:
      'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg',
  },
  {
    nombre: 'Sprite 500ml',
    descripcion: 'Refrescante y burbujeante.',
    precio: 600,
    imagen:
      'https://jumboargentina.vtexassets.com/arquivos/ids/791794/Gaseosa-Sprite-Lima-lim-n-500-Ml-2-10500.jpg',
  },
  {
    nombre: 'Pepsi 500ml',
    descripcion: 'Sabor intenso y dulce.',
    precio: 600,
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTooWaDpeRMRn3ovabfMGuffQqyCHrwEaX2wg&s',
  },
  {
    nombre: 'Fanta 500ml',
    descripcion: 'Sabor a naranja vibrante.',
    precio: 600,
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1gchwgtyzebd6UKho0wad3sI0ANDsQy7eLA&s',
  },
  {
    nombre: 'Agua con gas',
    descripcion: 'Burbujeante y ligera.',
    precio: 550,
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYtDXx8uaHUDFUsLlUA88UHV4QJgsIpPx_zg&s',
  },
  
];


  const handleAgregar = (item) => {
    agregarProducto(item);
    router.push('/confirmarPedido');
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl mb-6 font-semibold">Elegí tu bebida</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bebidas.map((bebida, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl shadow-lg hover:shadow-2xl transition bg-white"
          >
            <img
              src={bebida.imagen}
              alt={bebida.nombre}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{bebida.nombre}</h3>
            <p className="text-gray-600">{bebida.descripcion}</p>
            <p className="font-semibold mt-2">${bebida.precio}</p>
            <button
              onClick={() => handleAgregar(bebida)}
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

export default Bebidas;
