'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { reemplazarProductoPorCategoria } from '../../app/redux/pedidosSlice';
import Loading from '../../components/ui/loading';

const Hamburguesas = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [hamburguesas, setHamburguesas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [tamano, setTamano] = useState('');
  const [loading, setLoading] = useState(true);
  const tamanoRef = useRef(null);

  useEffect(() => {
    const fetchHamburguesas = async () => {
      try {
        const res = await fetch('/api/pedidos');
        const data = await res.json();
        if (data.hamburguesas) {
          setHamburguesas(data.hamburguesas);
        }
      } catch (error) {
        console.error('Error al cargar hamburguesas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHamburguesas();
  }, []);

  const calcularPrecio = (base, tam) => {
    if (tam === 'doble') return Math.round(base * 1.2);
    if (tam === 'triple') return Math.round(base * 1.5);
    return base;
  };

  const handleSeleccion = (item) => {
    setSeleccionada(item);
    setTamano('');
    setTimeout(() => {
      tamanoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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
        },
      })
    );
  };

  const handleSiguiente = () => {
    router.push('/combo');
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl mb-6 font-semibold text-center">Elegí tu hamburguesa</h2>

      <div className="flex flex-col gap-6">
        {hamburguesas.map((item) => (
          <div
            key={item._id}
            className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition-all duration-200 shadow ${
              seleccionada?.nombre === item.nombre
                ? 'border-green-500 shadow-md scale-[1.02]'
                : 'border-gray-300'
            }`}
            onClick={() => handleSeleccion(item)}
          >
            <img
              src={item.imagen}
              alt={item.nombre}
              className="w-32 h-32 object-cover rounded-md"
            />
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="text-xl font-semibold">{item.nombre}</h3>
                  <p className="text-gray-600">{item.descripcion}</p>
                </div>
                <p className="text-yellow-500 font-bold text-lg whitespace-nowrap mt-2 md:mt-0 md:ml-4">
                  Desde ${item.basePrecio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {seleccionada && (
        <div ref={tamanoRef} className="mt-10 text-center">
          <div className="mb-4 animate-bounce text-green-700 font-semibold text-lg flex items-center justify-center gap-2">
            <span>👇 Elegí el tamaño de tu hamburguesa</span>
          </div>
          <h3 className="text-lg font-semibold mb-3">Tamaños disponibles</h3>
          <div className="flex gap-4 justify-center flex-wrap">
            {['simple', 'doble', 'triple'].map((t) => (
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
