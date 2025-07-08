import Comentario from "../model/Comentario";
import mongoose, { Types } from "mongoose";
import { IComentario } from "../types/IComentario";

interface Resultado {
  mensaje?: string;
  error?: string;
  [key: string]: any;
}

export const agregar = async (datos: Partial<IComentario>): Promise<Resultado> => {
  try {
    const nuevoComentario = new Comentario(datos);
    await nuevoComentario.save();
    return { mensaje: "Comentario agregado con éxito" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const listar = async (): Promise<IComentario[] | Resultado> => {
  try {
    return await Comentario.find();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const obtenerPorId = async (id: string): Promise<IComentario | Resultado> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: "ID inválido" };
    }

    const comentario = await Comentario.findById(new Types.ObjectId(id));
    return comentario ?? { error: "Comentario no encontrado" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const actualizar = async (
  id: string,
  datos: Partial<IComentario>
): Promise<IComentario | Resultado> => {
  try {
    const actualizado = await Comentario.findByIdAndUpdate(id, datos, { new: true });
    return actualizado ?? { error: "Comentario no encontrado" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const eliminar = async (id: string): Promise<IComentario | Resultado> => {
  try {
    const eliminado = await Comentario.findByIdAndDelete(id);
    return eliminado ?? { error: "Comentario no encontrado" };
  } catch (error: any) {
    return { error: error.message };
  }
};
