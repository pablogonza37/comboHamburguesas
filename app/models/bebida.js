import mongoose from 'mongoose';

const BebidaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagen: { type: String },
  categoria: { type: String, default: 'bebida' }
});

export default mongoose.models.Bebida || mongoose.model('Bebida', BebidaSchema);
