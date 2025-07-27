import mongoose from 'mongoose';

const HamburguesaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  basePrecio: { type: Number, required: true },
  imagen: { type: String },
  categoria: { type: String, default: 'hamburguesa' }
});

export default mongoose.models.Hamburguesa || mongoose.model('Hamburguesa', HamburguesaSchema);
