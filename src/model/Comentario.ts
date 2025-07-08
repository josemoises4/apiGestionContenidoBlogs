import { Schema, model } from "mongoose";
import { IComentario } from "../types/IComentario";

const comentarioSchema = new Schema<IComentario>(
  {
    contenido: { type: String, required: true },
    fecha_publicacion: { type: Date, default: Date.now },
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    articulo_id: {
      type: Schema.Types.ObjectId,
      ref: "Articulo",
      required: true,
    },
  },
  { collection: "Comentario" }
);

export default model<IComentario>("Comentario", comentarioSchema);
