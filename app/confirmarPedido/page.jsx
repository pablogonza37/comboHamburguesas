'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const ConfirmarPedido = () => {
  const { pedido, total } = useSelector((state) => state.pedido);
  const router = useRouter();

  const handleConfirmar = async () => {
    if (!pedido || pedido.length === 0) {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Sin pedido',
        text: 'No hay productos en el pedido. ¿Querés elegir algo?',
        showCancelButton: true,
        confirmButtonText: 'Ir a hamburguesas',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#16a34a',
        cancelButtonColor: '#9ca3af',
      });

      if (result.isConfirmed) {
        router.push('/hamburguesas');
      }

      return;
    }

    try {
      await Swal.fire({
        icon: 'success',
        title: '¡Pedido confirmado!',
        text: 'Tu pedido ha sido enviado correctamente, elige tu forma de pago preferida.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#16a34a',
      });

      // dispatch(reiniciarPedido());
      router.push('/pago');
    } catch (error) {
      console.error('Error al enviar el pedido:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar el pedido.',
        confirmButtonColor: '#dc2626',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Resumen del Pedido</h2>
      <ul className="mb-4">
        {pedido.map((item, index) => (
          <li key={index} className="flex justify-between border-b py-2">
            <span>{item.nombre}</span>
            <span>${item.precio}</span>
          </li>
        ))}
      </ul>
      <div className="text-right font-bold text-xl mb-4">Total: ${total}</div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleConfirmar}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Confirmar Pedido
        </button>
        <button
          onClick={() => router.push('/hamburguesas')}
          className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
        >
          Nuevo Pedido
        </button>
      </div>
    </div>
  );
};

export default ConfirmarPedido;
