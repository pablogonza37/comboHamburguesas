import { configureStore } from '@reduxjs/toolkit';
import pedidoReducer from './pedidosSlice';

export const store = configureStore({
  reducer: {
    pedido: pedidoReducer,
  },
});
