import { configureStore } from '@reduxjs/toolkit';
import pedidoReducer from './pedidosSlice';
import historialReducer from './historialSlice';

export const store = configureStore({
  reducer: {
    pedido: pedidoReducer,
    historial: historialReducer,
  },
});
