// app/api/usuarios/[id]/route.js
import { ObjectId } from 'mongodb';
import clientPromise from '../db/mongodb.js';

export async function GET(request) {
  const { id } = request.params;
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const user = await db.collection('usuarios').findOne({ _id: new ObjectId(id) });
  if (user) {
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  const { id } = request.params;
  const updatedUser = await request.json();
  const client = await clientPromise;
  const db = client.db('pancakedb');

  await db.collection('usuarios').updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedUser }
  );

  return new Response(JSON.stringify({ message: 'Usuario actualizado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const { id } = request.params;
  const client = await clientPromise;
  const db = client.db('pancakedb');

  await db.collection('usuarios').deleteOne({ _id: new ObjectId(id) });

  return new Response(JSON.stringify({ message: 'Usuario borrado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
