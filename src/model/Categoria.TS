import mongoose, { Schema, Document, model } from "mongoose";
import { ICategoria } from "../types/ICategoria";

const categoriaSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo",
    },
  },
  { collection: "Categoria" }
);

export default model<ICategoria>("Categoria", categoriaSchema);
