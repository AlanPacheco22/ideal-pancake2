// app/api/usuarios/route.js
import Usuario from '../db/model/Usuarios.js';
import clientPromise from '../db/mongodb.js';

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const usuarios = await db.collection('usuarios').find({}).toArray();
  return new Response(JSON.stringify(usuarios.map(doc => Usuario.fromDB(doc))), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const { nombre, correo, imagenUrl, fechaCreacion } = await request.json();

  const newUser = new Usuario(nombre, correo, imagenUrl, fechaCreacion);
  await db.collection('usuarios').insertOne(newUser.toDB());

  return new Response(JSON.stringify({ message: 'Usuario creado' }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}


