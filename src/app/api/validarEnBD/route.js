// app/api/validarEnBD/route.js
import clientPromise from '../db/mongodb';

export async function POST(request) {
  const { nombre, correo, imagenUrl } = await request.json();

  if (!nombre || !correo || !imagenUrl) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = await clientPromise;
  const db = client.db('pancakedb');

  const existingUser = await db.collection('usuarios').findOne({ correo });

  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists', user: existingUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const newUser = {
    nombre,
    correo,
    imagenUrl,
    fechaCreacion: new Date(),
  };

  const result = await db.collection('usuarios').insertOne(newUser);

  return new Response(JSON.stringify({ message: 'User created' }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

