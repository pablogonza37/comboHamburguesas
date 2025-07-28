'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { agregarPedidoConfirmado } from '../redux/historialSlice';
import { reiniciarPedido } from '../redux/pedidosSlice';

const ConfirmarPedido = () => {
  const dispatch = useDispatch();
  const { pedido, total } = useSelector((state) => state.pedido);
  const router = useRouter();

  const handleConfirmar = async () => {
    console.log('Pedido que se va a guardar:', { pedido, total });
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
      dispatch(agregarPedidoConfirmado({ pedido, total }));
      dispatch(reiniciarPedido());

      await Swal.fire({
        icon: 'success',
        title: '¡Pedido confirmado!',
        text: 'Tu pedido ha sido enviado correctamente.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#16a34a',
      });

      router.push('/pedidosConfirmados');
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

  const handleEliminar = () => {
    dispatch(reiniciarPedido());
    router.push('/hamburguesas');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 mb-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Resumen del Pedido</h2>
      <ul className="mb-4">
        {pedido.map((item, index) => (
          <li key={index} className="flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-3">
              <img
                src={item.imagen || '/img/default.jpg'}
                alt={item.nombre}
                className="w-12 h-12 object-cover rounded"
              />
              <span>{item.nombre}</span>
            </div>
            <span className="text-right">${item.precio}</span>
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
          onClick={handleEliminar}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Eliminar Pedido Actual
        </button>
      </div>
    </div>
  );
};

export default ConfirmarPedido;
