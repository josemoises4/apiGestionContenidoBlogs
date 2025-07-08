import { Document } from "mongoose";

export interface ICategoria extends Document {
  nombre: string;
  estado?: "Activo" | "Inactivo";
}
