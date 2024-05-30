// models/Usuario.js
import { ObjectId } from 'mongodb';

export default class Usuario {
  constructor(id, nombre, correo, imagenUrl, fechaCreacion) {
    this._id = id; // Es buena práctica incluir el _id para representar el ObjectId de MongoDB
    this.nombre = nombre;
    this.correo = correo;
    this.imagenUrl = imagenUrl;
    this.fechaCreacion = fechaCreacion;
  }

  static fromDB(doc) {
    return new Usuario(
      doc._id.toString(), // Convertir ObjectId a string
      doc.nombre,
      doc.correo,
      doc.imagenUrl,
      doc.fechaCreacion
    );
  }

  toDB() {
    return {
      nombre: this.nombre,
      correo: this.correo,
      imagenUrl: this.imagenUrl,
      fechaCreacion: this.fechaCreacion instanceof Date ? this.fechaCreacion : new Date(this.fechaCreacion)
    };
  }
}
