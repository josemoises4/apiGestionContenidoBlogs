import { Document, Types } from "mongoose";

export interface IArticulo extends Document {
  titulo: string;
  contenido: string;
  fecha_publicacion?: Date;
  imagen?: string;
  fecha_actualizacion?: Date;
  estado?: "Borrador" | "Publicado" | "Archivado";
  categoria_id: Types.ObjectId;
  usuario_id: Types.ObjectId;
}
