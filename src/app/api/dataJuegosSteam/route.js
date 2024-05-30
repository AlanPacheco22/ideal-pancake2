// app/api/dataJuegosSteam/route.js
import JuegoSteam from '../../db/model/JuegoSteam.js';
import clientPromise from '../../db/mongodb.js';

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const juegosSteam = await db.collection('dataJuegosSteam').find({}).toArray();
  return new Response(JSON.stringify(juegosSteam.map(doc => JuegoSteam.fromDB(doc))), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db('pancakedb');

  const { idSteam, nombre, precio, fecha, imagenUrl } = await request.json();

  const newJuegoSteam = new JuegoSteam(idSteam, nombre, precio, fecha, imagenUrl);
  await db.collection('dataJuegosSteam').insertOne(newJuegoSteam.toDB());

  return new Response(JSON.stringify({ message: 'Juego de Steam creado' }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
