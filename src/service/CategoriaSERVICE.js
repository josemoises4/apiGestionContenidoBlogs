const Categoria = require('../model/Categoria');
const mongoose = require("mongoose");

const agregar = async (datos) => {
    try {
        const nuevaCategoria = new Categoria(datos);
        await nuevaCategoria.save();
        return { mensaje: "Categoria agregado con éxito"}
    } catch (error) {
        return { error: error.message};
    }
}

const listar = async() => {
    try {
        return await Categoria.find();
    } catch (error) {
        return { error: error.message};
    }
}

const obtenerPorId = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }
        const categoria = await Categoria.findById(new mongoose.Types.ObjectId(id));
        return categoria;
    } catch (error) {
        return { error: error.message };
    }
};

const actualizar = async (id, datos) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }
        return await Categoria.findByIdAndUpdate(id, datos, { new: true });
    } catch (error) {
        return { error: error.message };
    }
};

const eliminar = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }
        return await Categoria.findByIdAndDelete(id);
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = { agregar, listar, obtenerPorId, actualizar, eliminar };