'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

const PrecioTotal = () => {
  const total = useSelector((state) => state.pedido.total); 
  const pathname = usePathname();

  if (pathname === '/principal') return null;
  if (pathname === '/pedidosConfirmados') return null;
  if (pathname === '/pago') return null;

  return (
    <div className="fixed top-20 right-4 bg-black text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold z-50">
      Total: ${total}
    </div>
  );
};

export default PrecioTotal;


