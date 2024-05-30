// app/api/dataJuegosSteam/[idSteam]/route.js
import { ObjectId } from 'mongodb';
import clientPromise from '../../db/mongodb.js';

export async function GET(request) {
  const { idSteam } = request.params;
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const juegoSteam = await db.collection('dataJuegosSteam').findOne({ _id: new ObjectId(idSteam) });
  if (juegoSteam) {
    return new Response(JSON.stringify(juegoSteam), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'Juego de Steam no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  const { idSteam } = request.params;
  const updatedJuegoSteam = await request.json();
  const client = await clientPromise;
  const db = client.db('pancakedb');

  await db.collection('dataJuegosSteam').updateOne(
    { _id: new ObjectId(idSteam) },
    { $set: updatedJuegoSteam }
  );

  return new Response(JSON.stringify({ message: 'Juego de Steam actualizado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const { idSteam } = request.params;
  const client = await clientPromise;
  const db = client.db('pancakedb');

  await db.collection('dataJuegosSteam').deleteOne({ _id: new ObjectId(idSteam) });

  return new Response(JSON.stringify({ message: 'Juego de Steam borrado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
