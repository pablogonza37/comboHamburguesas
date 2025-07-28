import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pedido: [],
  total: 0,
};

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState,
  reducers: {
    reemplazarProductoPorCategoria: (state, action) => {
      const { categoria, nuevoProducto } = action.payload;
      state.pedido = state.pedido.filter(p => p.categoria !== categoria);
      state.pedido.push(nuevoProducto);
      state.total = state.pedido.reduce((acc, curr) => acc + curr.precio, 0);
    },

    // 👇 Nuevo reducer
    agregarProducto: (state, action) => {
      state.pedido.push(action.payload);
      state.total += action.payload.precio;
    },

    reiniciarPedido: (state) => {
      state.pedido = [];
      state.total = 0;
    },
  },
});

export const { reemplazarProductoPorCategoria, agregarProducto, reiniciarPedido } = pedidoSlice.actions;
export default pedidoSlice.reducer;
