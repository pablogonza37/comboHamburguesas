'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { reemplazarProductoPorCategoria } from '../../app/redux/pedidosSlice';

const Bebidas = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [seleccionada, setSeleccionada] = useState(null);

  const productos = useSelector((state) => state.pedido.pedido);
  const hayCombo = productos.some((p) => p.categoria === 'combo');

useEffect(() => {
    if (!hayCombo) {
      router.push('/combo');
    }
  }, [hayCombo, router]);

  const bebidas = [
    {
      nombre: 'Coca-Cola 500ml',
      descripcion: 'Clásica y refrescante.',
      precio: 600,
      imagen: 'https://fratalmacenar.vtexassets.com/arquivos/ids/156126-800-auto?v=638358478554870000&width=800&height=auto&aspect=true',
      categoria: 'bebida',
    },
    {
      nombre: 'Agua sin gas',
      descripcion: 'Natural y ligera.',
      precio: 500,
      imagen: 'https://images.pexels.com/photos/30762213/pexels-photo-30762213.jpeg',
      categoria: 'bebida',
    },
    {
      nombre: 'Limonada',
      descripcion: 'Con menta y limón.',
      precio: 750,
      imagen: 'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg',
      categoria: 'bebida',
    },
    {
      nombre: 'Sprite 500ml',
      descripcion: 'Refrescante y burbujeante.',
      precio: 600,
      imagen: 'https://jumboargentina.vtexassets.com/arquivos/ids/791794/Gaseosa-Sprite-Lima-lim-n-500-Ml-2-10500.jpg',
      categoria: 'bebida',
    },
    {
      nombre: 'Pepsi 500ml',
      descripcion: 'Sabor intenso y dulce.',
      precio: 600,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTooWaDpeRMRn3ovabfMGuffQqyCHrwEaX2wg&s',
      categoria: 'bebida',
    },
    {
      nombre: 'Fanta 500ml',
      descripcion: 'Sabor a naranja vibrante.',
      precio: 600,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1gchwgtyzebd6UKho0wad3sI0ANDsQy7eLA&s',
      categoria: 'bebida',
    },
    {
      nombre: 'Agua con gas',
      descripcion: 'Burbujeante y ligera.',
      precio: 550,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYtDXx8uaHUDFUsLlUA88UHV4QJgsIpPx_zg&s',
      categoria: 'bebida',
    },
  ];

  const handleSeleccionar = (bebida) => {
    setSeleccionada(bebida);
    dispatch(
      reemplazarProductoPorCategoria({
        categoria: 'bebida',
        nuevoProducto: bebida,
      })
    );
  };

  const handleSiguiente = () => {
    router.push('/confirmarPedido');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl mb-6 font-semibold text-center">Elegí tu bebida</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bebidas.map((bebida, index) => (
          <div
            key={index}
            onClick={() => handleSeleccionar(bebida)}
            className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 ${
              seleccionada?.nombre === bebida.nombre
                ? 'border-green-500 shadow-lg scale-105'
                : 'border-gray-300 hover:shadow'
            }`}
          >
            <img
              src={bebida.imagen}
              alt={bebida.nombre}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{bebida.nombre}</h3>
            <p className="text-gray-600">{bebida.descripcion}</p>
            <p className="font-semibold mt-2">${bebida.precio}</p>
          </div>
        ))}
      </div>

      {seleccionada && (
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

export default Bebidas;
