const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  fecha_creacion: { type: Date, default: Date.now },
  rol: { type: String, required: true }
}, {collection: 'Usuario'});

module.exports = mongoose.model('Usuario', usuarioSchema);
