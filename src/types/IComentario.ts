import { Document, Types } from "mongoose";

export interface IComentario extends Document {
  contenido: string;
  fecha_publicacion?: Date;
  usuario_id: Types.ObjectId;
  articulo_id: Types.ObjectId;
}
