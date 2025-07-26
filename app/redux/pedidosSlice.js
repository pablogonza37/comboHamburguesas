import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pedido: [],
  total: 0,
};

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState,
  reducers: {
    agregarProducto: (state, action) => {
      const producto = action.payload;

      // Agrega cualquier producto (incluyendo hamburguesas) sin reemplazar
      state.pedido.push(producto);
      state.total += producto.precio;
    },
    reiniciarPedido: (state) => {
      state.pedido = [];
      state.total = 0;
    }
  }
});

export const { agregarProducto, reiniciarPedido } = pedidoSlice.actions;
export default pedidoSlice.reducer;
