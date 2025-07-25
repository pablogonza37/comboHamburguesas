'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux'; // ✅
import { reiniciarPedido } from '../../app/redux/pedidosSlice'; 

const Pago = () => {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch(); // ✅

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

  const confirmarCompra = () => {
    Swal.fire({
      title: '¿Confirmás la compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Compra confirmada!', 'Gracias por tu compra.', 'success').then(() => {
          dispatch(reiniciarPedido()); // ✅ Limpia el pedido y el total
          router.push('/principal');
        });
      }
    });
  };

  return (
    <div className="bg-gray-50 py-12 px-4 min-h-screen">
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
