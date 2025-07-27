import mongoose from 'mongoose';

const ComboSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagen: { type: String },
  categoria: { type: String, default: 'combo' }
});

export default mongoose.models.Combo || mongoose.model('Combo', ComboSchema);
