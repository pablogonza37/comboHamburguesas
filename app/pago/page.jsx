'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { reiniciarPedido } from '../../app/redux/pedidosSlice';
import { limpiarHistorial } from '../../app/redux/historialSlice';

const Pago = () => {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const historial = useSelector((state) => state.historial.pedidosConfirmados);
  const totalAcumulado = historial.reduce((total, pedido) => total + pedido.total, 0);

  const metodos = [
    { nombre: 'Tarjeta de crédito / débito', icono: '💳' },
    { nombre: 'Mercado Pago', icono: '📱' },
    { nombre: 'Transferencia bancaria', icono: '🏦' },
    { nombre: 'Efectivo', icono: '💵' },
  ];

  const seleccionarMetodo = (index) => {
    setMetodoSeleccionado(index);
  };

  const renderFormulario = () => {
    switch (metodoSeleccionado) {
      case 0:
        return (
          <div className="space-y-4">
            <input className="input" placeholder="Nombre en la tarjeta" />
            <input className="input" placeholder="Número de tarjeta" />
            <div className="flex gap-4">
              <input className="input w-1/2" placeholder="Vencimiento (MM/AA)" />
              <input className="input w-1/2" placeholder="CVV" />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <label className="block font-semibold">Escaneá el código QR para pagar:</label>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?data=MercadoPagoSimulado&size=200x200"
              alt="QR Mercado Pago"
              className="mx-auto"
            />
            <p className="text-center text-gray-600 text-sm">O pagá desde tu cuenta de Mercado Pago</p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <input className="input" placeholder="Nombre del titular de la cuenta" />
            <input className="input" placeholder="CBU o alias" />
            <input className="input" placeholder="Banco" />
          </div>
        );
      case 3:
        return (
          <p className="text-gray-700">
            El pago se realizará al momento de la entrega. Asegurate de tener el dinero justo.
          </p>
        );
      default:
        return null;
    }
  };

  const confirmarCompra = async () => {
    const resultado = await Swal.fire({
      title: '¿Confirmás la compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
    });

    if (resultado.isConfirmed) {
      try {
        // Enviar el historial completo a la base de datos
        const res = await fetch('/api/pedidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productos: historial.map(p => p.productos).flat(), // Todos los productos de todos los pedidos
            total: totalAcumulado,
          }),
        });

        if (!res.ok) {
          throw new Error('Error al guardar el pedido');
        }

        await Swal.fire('¡Compra confirmada!', 'Gracias por tu compra.', 'success');
        dispatch(reiniciarPedido());
        dispatch(limpiarHistorial());
        router.push('/principal');
      } catch (error) {
        console.error('Error al confirmar la compra:', error);
        Swal.fire('Error', 'No se pudo guardar el pedido. Intentalo más tarde.', 'error');
      }
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 min-h-screen relative">
      <div className="fixed top-24 right-4 bg-yellow-300 text-black font-bold px-4 py-2 rounded-xl shadow-lg z-50">
        Total acumulado: ${totalAcumulado}
      </div>

      <h2 className="text-4xl font-bold text-center mb-10">
        Elegí tu medio de pago
      </h2>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {metodos.map((metodo, index) => (
          <div
            key={index}
            onClick={() => seleccionarMetodo(index)}
            className={`cursor-pointer p-6 border rounded-xl flex items-center space-x-4 transition duration-300 ${
              metodoSeleccionado === index
                ? 'border-yellow-500 bg-yellow-100'
                : 'hover:border-yellow-400'
            }`}
          >
            <span className="text-3xl">{metodo.icono}</span>
            <span className="text-lg font-semibold">{metodo.nombre}</span>
          </div>
        ))}
      </div>

      {metodoSeleccionado !== null && (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4">
            {metodos[metodoSeleccionado].nombre}
          </h3>
          {renderFormulario()}

          <div className="text-center mt-8">
            <button
              onClick={confirmarCompra}
              className="px-10 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold transition duration-300"
            >
              Confirmar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pago;
