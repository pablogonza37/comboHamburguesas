'use client';

import React from 'react';
import { useSelector } from 'react-redux';
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

      // Si tenés una acción para reiniciar, descomentala:
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
        {pedido.map((item, index) => {
          const grupo = Math.floor(index / 3) + 1;
          const esPrimeroDelGrupo = index % 3 === 0;

          return (
            <React.Fragment key={index}>
              {esPrimeroDelGrupo && (
                <>
                  {index !== 0 && (
                    <hr className="my-4 border-t-2 border-dashed border-gray-400" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-2">
                    Pedido {grupo}
                  </h3>
                </>
              )}
              <li className="flex items-center justify-between border-b py-2">
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
            </React.Fragment>
          );
        })}
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
