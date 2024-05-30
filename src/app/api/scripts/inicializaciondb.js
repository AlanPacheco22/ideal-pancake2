const clientPromise = require('../db/mongodb.js');

async function createCollections() {
  const client = await clientPromise;
  const db = client.db('pancakedb');

  try {
    // Crear colección de usuarios
    await db.createCollection('usuarios', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['nombre', 'correo', 'imagenUrl', 'fechaCreacion'],
          properties: {
            nombre: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            },
            correo: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            },
            imagenUrl: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            },
            fechaCreacion: {
              bsonType: 'date',
              description: 'Debe ser una fecha y es obligatorio'
            }
          }
        }
      }
    });

    // Crear colección de dataJuegosSteam
    await db.createCollection('dataJuegosSteam', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['idSteam', 'nombre', 'precio', 'fecha', 'imagenUrl'],
          properties: {
            idSteam: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            },
            nombre: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            },
            precio: {
              bsonType: 'double',
              description: 'Debe ser un número y es obligatorio'
            },
            fecha: {
              bsonType: 'date',
              description: 'Debe ser una fecha y es obligatorio'
            },
            imagenUrl: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            }
          }
        }
      }
    });

    // Crear colección de dataJuegosGog
    await db.createCollection('dataJuegosGog', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['idGog', 'nombre', 'precio', 'fecha', 'imagenUrl'],
          properties: {
            idGog: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            },
            nombre: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            },
            precio: {
              bsonType: 'double',
              description: 'Debe ser un número y es obligatorio'
            },
            fecha: {
              bsonType: 'date',
              description: 'Debe ser una fecha y es obligatorio'
            },
            imagenUrl: {
              bsonType: 'string',
              description: 'Debe ser una cadena y es obligatorio'
            }
          }
        }
      }
    });

    console.log('Base de datos y colecciones creadas con éxito');
  } catch (error) {
    console.error('Error al crear colecciones:', error);
  } finally {
    // Cerrar la conexión al cliente
    await client.close();
    console.log('Conexión cerrada');
  }
}

createCollections().catch(console.error);
