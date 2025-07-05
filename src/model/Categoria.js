const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo'}
}, {collection: 'Categoria'});

module.exports = mongoose.model('Categoria', categoriaSchema);
