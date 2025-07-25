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

      if (producto.categoria === 'hamburguesa') {
        const sinHamburguesa = state.pedido.filter(item => item.categoria !== 'hamburguesa');
        const anterior = state.pedido.find(p => p.categoria === 'hamburguesa');
        const resta = anterior ? anterior.precio : 0;

        state.pedido = [...sinHamburguesa, producto];
        state.total = state.total - resta + producto.precio;
      } else {
        state.pedido.push(producto);
        state.total += producto.precio;
      }
    },
    reiniciarPedido: (state) => {
      state.pedido = [];
      state.total = 0;
    }
  }
});

export const { agregarProducto, reiniciarPedido } = pedidoSlice.actions;
export default pedidoSlice.reducer;
