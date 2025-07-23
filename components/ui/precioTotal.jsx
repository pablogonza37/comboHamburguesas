'use client';

import React from 'react';
import { usePrecio } from '../../app/contexto/precioContext';
import { usePathname } from 'next/navigation';

const PrecioTotal = () => {
  const { total } = usePrecio();
  const pathname = usePathname();

  // No mostrar si estamos en la página principal
  if (pathname === '/principal') return null;

  return (
    <div className="fixed top-20 right-4 bg-black text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold z-50">
  Total: ${total}
</div>
  );
};

export default PrecioTotal;

