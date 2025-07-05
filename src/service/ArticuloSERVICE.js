const Articulo = require('../model/Articulo');
const mongoose = require("mongoose");

const agregar = async (datos) => {
    try {
        const nuevoArticulo = new Articulo(datos);
        await nuevoArticulo.save();
        return { mensaje: "Articulo publicado con éxito"}
    } catch (error) {
        return { error: error.message};
    }
}

const listar = async() => {
    try {
        return await Articulo.find();
    } catch (error) {
        return { error: error.message};
    }
}

const obtenerPorId = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }

        const articulo = await Articulo.findById(new mongoose.Types.ObjectId(id));
        return articulo;
    } catch (error) {
        return { error: error.message };
    }
};

const actualizar = async (id, datos) => {
    try {
        return await Articulo.findByIdAndUpdate(id, datos, { new: true });
    } catch (error) {
        return { error: error.message };
    }
}

const eliminar = async (id) => {
    try {
        return await Articulo.findByIdAndDelete(id);
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { agregar, listar, obtenerPorId, actualizar, eliminar};