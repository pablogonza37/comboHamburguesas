// app/redux/historialSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pedidosConfirmados: [],
};

export const historialSlice = createSlice({
  name: 'historial',
  initialState,
  reducers: {
    agregarPedidoConfirmado: (state, action) => {
      state.pedidosConfirmados.push(action.payload);
    },
    limpiarHistorial: (state) => {
      state.pedidosConfirmados = [];
    },
  },
});

export const { agregarPedidoConfirmado, limpiarHistorial } = historialSlice.actions;

export default historialSlice.reducer;
