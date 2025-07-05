const { Schema, model, Types } = require('mongoose');

const comentarioSchema = new Schema({
  contenido: { type: String, required: true },
  fecha_publicacion: { type: Date, default: Date.now },
  usuario_id: { type: Types.ObjectId, ref: 'Usuario', required: true },
  articulo_id: { type: Types.ObjectId, ref: 'Articulo', required: true }
}, { collection: 'Comentario' });

module.exports = model('Comentario', comentarioSchema);
