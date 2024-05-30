// app/api/dataJuegosGog/[idGog]/route.js
import { ObjectId } from 'mongodb';
import clientPromise from '../../db/mongodb.js';

export async function GET(request) {
  const { idGog } = request.params;
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const juegoGog = await db.collection('dataJuegosGog').findOne({ _id: new ObjectId(idGog) });
  if (juegoGog) {
    return new Response(JSON.stringify(juegoGog), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'Juego de GOG no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  const { idGog } = request.params;
  const updatedJuegoGog = await request.json();
  const client = await clientPromise;
  const db = client.db('pancakedb');

  await db.collection('dataJuegosGog').updateOne(
    { _id: new ObjectId(idGog) },
    { $set: updatedJuegoGog }
  );

  return new Response(JSON.stringify({ message: 'Juego de GOG actualizado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const { idGog } = request.params;
  const client = await clientPromise;
  const db = client.db('pancakedb');

  await db.collection('dataJuegosGog').deleteOne({ _id: new ObjectId(idGog) });

  return new Response(JSON.stringify({ message: 'Juego de GOG borrado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
