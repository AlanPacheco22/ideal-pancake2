const { MongoClient } = require('mongodb');

//const uri = process.env.MONGODB_URI; // La URI de conexión de MongoDB
console.log(process.env.MONGODB_URI)
const uri = "mongodb://localhost:27017/pancakedb"
const options = {};

let client;
let clientPromise;

/*if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}*/

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usa una variable global para preservar el cliente
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, crea un nuevo cliente
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

module.exports = clientPromise;
