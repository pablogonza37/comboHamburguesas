'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { reemplazarProductoPorCategoria } from '../../app/redux/pedidosSlice';
import Loading from '../../components/ui/loading'; 

const Bebidas = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [seleccionada, setSeleccionada] = useState(null);
  const [bebidas, setBebidas] = useState([]);
  const [loading, setLoading] = useState(true);

  const productos = useSelector((state) => state.pedido.pedido);
  const hayCombo = productos.some((p) => p.categoria === 'combo');

  useEffect(() => {
    if (!hayCombo) {
      router.push('/combo');
    }
  }, [hayCombo, router]);

  useEffect(() => {
    const obtenerBebidas = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/pedidos');
        const data = await res.json();
        if (data.bebidas) {
          setBebidas(data.bebidas);
        }
      } catch (error) {
        console.error('Error al traer bebidas:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerBebidas();
  }, []);

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


  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl mb-6 font-semibold text-center">Elegí tu bebida</h2>
      <div className="flex flex-col gap-6">
        {bebidas.map((bebida, index) => (
          <div
            key={index}
            onClick={() => handleSeleccionar(bebida)}
            className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition-all duration-200 shadow ${
              seleccionada?.nombre === bebida.nombre
                ? 'border-green-500 shadow-md scale-[1.02]'
                : 'border-gray-300'
            }`}
          >
            <img
              src={bebida.imagen}
              alt={bebida.nombre}
              className="w-32 h-32 object-cover rounded-md"
            />
            <div className="flex-1 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{bebida.nombre}</h3>
                <p className="text-gray-600">{bebida.descripcion}</p>
              </div>
              <p className="text-gray-800 font-semibold whitespace-nowrap ml-4">
                ${bebida.precio}
              </p>
            </div>
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
