import { Schema, model } from "mongoose";
import { IArticulo } from "../types/IArticulo";

const articuloSchema = new Schema<IArticulo>(
  {
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    fecha_publicacion: { type: Date, default: Date.now },
    imagen: { type: String },
    fecha_actualizacion: { type: Date },
    estado: {
      type: String,
      enum: ["Borrador", "Publicado", "Archivado"],
      default: "Publicado",
    },
    categoria_id: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { collection: "Articulo" }
);

export default model<IArticulo>("Articulo", articuloSchema);
