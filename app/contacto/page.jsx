'use client';

import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-red-100 text-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-red-600 text-center">Contacto</h1>
        <p className="text-center mb-6">¿Tenés una pregunta, sugerencia o solo querés decir hola? Escribinos.</p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400"
            required
          />
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Tu mensaje"
            rows={4}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all w-full"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
