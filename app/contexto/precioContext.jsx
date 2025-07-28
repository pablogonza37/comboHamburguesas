'use client';

import React, { createContext, useContext, useState } from 'react';

const PrecioContext = createContext();

export const usePrecio = () => useContext(PrecioContext);

export const PrecioProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [pedido, setPedido] = useState([]);

  const agregarProducto = (producto) => {
  
    if (producto.categoria === 'hamburguesa') {
      setPedido((prev) => {
        const sinHamburguesa = prev.filter(item => item.categoria !== 'hamburguesa');
        return [...sinHamburguesa, producto];
      });

      setTotal((prev) => {
        const anterior = pedido.find(p => p.categoria === 'hamburguesa');
        const resta = anterior ? anterior.precio : 0;
        return prev - resta + producto.precio;
      });
    } else {
      
      setPedido((prev) => [...prev, producto]);
      setTotal((prev) => prev + producto.precio);
    }
  };

  const reiniciarPedido = () => {
    setPedido([]);
    setTotal(0);
  };

  return (
    <PrecioContext.Provider value={{ pedido, total, agregarProducto, reiniciarPedido }}>
      {children}
    </PrecioContext.Provider>
  );
};
