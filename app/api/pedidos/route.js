import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Pedido from '../../models/Pedidos';
import Hamburguesa from '../../models/hamburguesa'
import Combo from '../../models/combo'
import Bebida from '../../models/bebida'

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


export async function GET() {
  await connectDB();
  try {
    const hamburguesas = await Hamburguesa.find({});
    const combos = await Combo.find({});
    const bebidas = await Bebida.find({});

    return NextResponse.json({
      hamburguesas,
      combos,
      bebidas
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}

