import mongoose from 'mongoose';

const PedidoSchema = new mongoose.Schema({
  productos: [
    {
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
    }
  ],
  total: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema);
