import Usuario from '../model/Usuario';
import mongoose from 'mongoose';
import { IUsuario } from '../types/IUsuario';

interface IRespuesta {
  mensaje?: string;
  error?: string;
}

// Agregar un nuevo usuario
const agregar = async (datos: IUsuario): Promise<IRespuesta> => {
  try {
    const nuevoUsuario = new Usuario(datos);
    await nuevoUsuario.save();
    return { mensaje: "Usuario agregado con éxito" };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Listar todos los usuarios
const listar = async (): Promise<IUsuario[] | IRespuesta> => {
  try {
    return await Usuario.find();
  } catch (error: any) {
    return { error: error.message };
  }
};

// Obtener un usuario por ID
const obtenerPorId = async (id: string): Promise<IUsuario | null | IRespuesta> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: "ID inválido" };
    }

    const usuario = await Usuario.findById(new mongoose.Types.ObjectId(id));
    return usuario;
  } catch (error: any) {
    return { error: error.message };
  }
};

// Actualizar un usuario
const actualizar = async (id: string, datos: Partial<IUsuario>): Promise<IUsuario | null | IRespuesta> => {
  try {
    return await Usuario.findByIdAndUpdate(id, datos, { new: true });
  } catch (error: any) {
    return { error: error.message };
  }
};

// Eliminar un usuario
const eliminar = async (id: string): Promise<IUsuario | null | IRespuesta> => {
  try {
    return await Usuario.findByIdAndDelete(id);
  } catch (error: any) {
    return { error: error.message };
  }
};

export { agregar, listar, obtenerPorId, actualizar, eliminar };
