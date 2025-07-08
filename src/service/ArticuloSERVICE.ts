import Articulo from '../model/Articulo';
import mongoose from 'mongoose';
import { IArticulo } from '../types/IArticulo';

const agregar = async (datos: IArticulo): Promise<{ mensaje: string } | { error: string }> => {
    try {
        const nuevoArticulo = new Articulo(datos);
        await nuevoArticulo.save();
        return { mensaje: "Articulo publicado con éxito" };
    } catch (error: any) {
        return { error: error.message };
    }
};

const listar = async (): Promise<IArticulo[] | { error: string }> => {
    try {
        return await Articulo.find();
    } catch (error: any) {
        return { error: error.message };
    }
};

const obtenerPorId = async (id: string): Promise<IArticulo | null | { error: string }> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }

        const articulo = await Articulo.findById(new mongoose.Types.ObjectId(id));
        return articulo;
    } catch (error: any) {
        return { error: error.message };
    }
};

const actualizar = async (
    id: string,
    datos: Partial<IArticulo>
): Promise<IArticulo | null | { error: string }> => {
    try {
        return await Articulo.findByIdAndUpdate(id, datos, { new: true });
    } catch (error: any) {
        return { error: error.message };
    }
};

const eliminar = async (id: string): Promise<IArticulo | null | { error: string }> => {
    try {
        return await Articulo.findByIdAndDelete(id);
    } catch (error: any) {
        return { error: error.message };
    }
};

export { agregar, listar, obtenerPorId, actualizar, eliminar };
