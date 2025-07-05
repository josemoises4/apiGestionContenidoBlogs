const { Schema, model, Types } = require('mongoose');

const articuloSchema = new Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha_publicacion: { type: Date, default: Date.now },
  imagen: { type: String },
  fecha_actualizacion: { type: Date },
  estado: { type: String, enum: ['Borrador', 'Publicado', 'Archivado'], default: 'Publicado' },
  categoria_id: { type: Types.ObjectId, ref: 'Categoria', required: true },
  usuario_id: { type: Types.ObjectId, ref: 'Usuario', required: true }
}, { collection: 'Articulo' });

module.exports = model('Articulo', articuloSchema);
