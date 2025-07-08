import Categoria from '../model/Categoria';
import mongoose, { Types } from 'mongoose';
import { ICategoria } from '../types/ICategoria';

// Tipo para entrada: solo lo necesario para crear
type CategoriaInput = Pick<ICategoria, "nombre">;

const agregar = async (datos: { nombre: string }): Promise<{ mensaje: string } | { error: string }> => {
    try {
        const nuevaCategoria = new Categoria(datos);
        await nuevaCategoria.save();
        return { mensaje: "Categoria agregado con éxito" };
    } catch (error: any) {
        return { error: error.message };
    }
}

const listar = async (): Promise<ICategoria[] | { error: string }> => {
    try {
        return await Categoria.find();
    } catch (error: any) {
        return { error: error.message };
    }
}

const obtenerPorId = async (id: string): Promise<ICategoria | null | { error: string }> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }
        const categoria = await Categoria.findById(new mongoose.Types.ObjectId(id));
        return categoria;
    } catch (error: any) {
        return { error: error.message };
    }
};

const actualizar = async (
    id: string,
    datos: Partial<ICategoria>
): Promise<ICategoria | null | { error: string }> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }
        return await Categoria.findByIdAndUpdate(id, datos, { new: true });
    } catch (error: any) {
        return { error: error.message };
    }
};

const eliminar = async (id: string): Promise<ICategoria | null | { error: string }> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }
        return await Categoria.findByIdAndDelete(id);
    } catch (error: any) {
        return { error: error.message };
    }
};

export { agregar, listar, obtenerPorId, actualizar, eliminar };
