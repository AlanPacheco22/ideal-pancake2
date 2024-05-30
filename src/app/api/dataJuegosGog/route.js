// app/api/juegosGog/route.js
import JuegoGog from '../db/model/JuegoGog.js';
import clientPromise from '../db/mongodb.js';

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const juegosGog = await db.collection('dataJuegosGog').find({}).toArray();
  return new Response(JSON.stringify(juegosGog.map(doc => JuegoGog.fromDB(doc))), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const { idGog, nombre, precio, fecha, imagenUrl } = await request.json();

  const newJuegoGog = new JuegoGog(idGog, nombre, precio, fecha, imagenUrl);
  await db.collection('dataJuegosGog').insertOne(newJuegoGog.toDB());

  return new Response(JSON.stringify({ message: 'Juego de GOG creado' }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

