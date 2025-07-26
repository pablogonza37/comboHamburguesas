'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const PedidosConfirmados = () => {
  const router = useRouter();

  // Accede correctamente al slice "historial"
  const pedidosConfirmados = useSelector((state) => state.historial.pedidosConfirmados);

  // Si aún no se cargó el estado o está vacío
  if (!pedidosConfirmados || pedidosConfirmados.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No hay pedidos confirmados.</h2>
        <button
          onClick={() => router.push('/hamburguesas')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Agregar pedido
        </button>
      </div>
    );
  }

  // Calcular total acumulado de todos los pedidos
  const totalGeneral = pedidosConfirmados.reduce((acc, pedido) => acc + pedido.total, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pedidos Confirmados</h2>

      <div className="grid gap-4">
        {pedidosConfirmados.map((pedido, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-2">Pedido #{index + 1}</h3>
            <ul className="mb-2">
              {pedido.pedido.map((producto, i) => (
  <li key={i} className="text-sm">
    {producto.nombre} - ${producto.precio}
  </li>
))}

            </ul>
            <p className="font-semibold">Total del pedido: ${pedido.total}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-lg font-bold">Total acumulado: ${totalGeneral}</p>

        <div className="mt-4 flex gap-4">
          <button
            onClick={() => router.push('/pago')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Pagar
          </button>
          <button
            onClick={() => router.push('/hamburguesas')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Agregar otro pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidosConfirmados;

