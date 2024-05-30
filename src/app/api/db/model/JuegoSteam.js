// models/JuegoSteam.js
import { ObjectId } from 'mongodb';

export default class JuegoSteam {
  constructor(idSteam, nombre, precio, fecha, imagenUrl) {
    this._id = idSteam; // Usamos idSteam como _id en este ejemplo
    this.nombre = nombre;
    this.precio = precio;
    this.fecha = fecha;
    this.imagenUrl = imagenUrl;
  }

  static fromDB(doc) {
    return new JuegoSteam(
      doc._id,
      doc.nombre,
      doc.precio,
      doc.fecha,
      doc.imagenUrl
    );
  }

  toDB() {
    return {
      nombre: this.nombre,
      precio: this.precio,
      fecha: this.fecha instanceof Date ? this.fecha : new Date(this.fecha),
      imagenUrl: this.imagenUrl
    };
  }
}
