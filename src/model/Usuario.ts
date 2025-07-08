import { Schema, model } from 'mongoose';
import { IUsuario } from '../types/IUsuario';

const usuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  fecha_creacion: { type: Date, default: Date.now },
  rol: { type: String, required: true },
}, { collection: 'Usuario' });

const Usuario = model<IUsuario>('Usuario', usuarioSchema);
export default Usuario;
