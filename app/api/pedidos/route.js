import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Pedido from '../../models/Pedidos';

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { productos, total } = body;

    if (!productos || !Array.isArray(productos) || productos.length === 0 || !total) {
      return NextResponse.json(
        { error: "Faltan datos del pedido" },
        { status: 400 }
      );
    }

    await Pedido.create({ productos, total });

    return NextResponse.json({ msg: "Pedido creado exitosamente" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error en el servidor, comunicarse con un administrador" },
      { status: 500 }
    );
  }
}


