'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { reemplazarProductoPorCategoria } from '../../app/redux/pedidosSlice';
import Loading from '../../components/ui/loading';

const Combo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [seleccionado, setSeleccionado] = useState(null);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  const productos = useSelector((state) => state.pedido.pedido);

  useEffect(() => {
    const hayHamburguesa = productos.some((p) => p.categoria === 'hamburguesa');
    if (!hayHamburguesa) {
      router.push('/hamburguesas');
    }
  }, [productos, router]);

  useEffect(() => {
    const obtenerCombos = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/pedidos');
        const data = await res.json();
        if (data.combos) {
          setCombos(data.combos);
        }
      } catch (error) {
        console.error('Error al traer combos:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerCombos();
  }, []);

  const handleSeleccionar = (combo) => {
    setSeleccionado(combo);
    dispatch(reemplazarProductoPorCategoria({ categoria: 'combo', nuevoProducto: combo }));
  };

  const handleSiguiente = () => {
    router.push('/bebidas');
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl mb-6 font-semibold text-center">Elegí tu combo</h2>
      <div className="flex flex-col gap-6">
        {combos.map((combo, index) => (
          <div
            key={index}
            onClick={() => handleSeleccionar(combo)}
            className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition-all duration-200 shadow ${
              seleccionado?.nombre === combo.nombre
                ? 'border-green-500 shadow-md scale-[1.02]'
                : 'border-gray-300'
            }`}
          >
            <img
              src={combo.imagen}
              alt={combo.nombre}
              className="w-32 h-32 object-cover rounded-md"
            />
            <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-xl font-semibold">{combo.nombre}</h3>
                <p className="text-gray-600">{combo.descripcion}</p>
              </div>
              <p className="text-yellow-500 font-bold text-lg whitespace-nowrap mt-2 md:mt-0 md:ml-4">
                ${combo.precio}
              </p>
            </div>
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
