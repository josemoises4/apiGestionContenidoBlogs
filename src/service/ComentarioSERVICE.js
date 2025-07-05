const Comentario = require('../model/Comentario');
const mongoose = require("mongoose");

const agregar = async (datos) => {
    try {
        const nuevoComentario = new Comentario(datos);
        await nuevoComentario.save();
        return { mensaje: "Comentario agregado con éxito" };
    } catch (error) {
        return { error: error.message}
    }
}

const listar = async() => {
    try {
        return await Comentario.find();
    } catch (error) {
        return { error: error.message };
    }
}

const obtenerPorId = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }

        const comentario = await Comentario.findById(new mongoose.Types.ObjectId(id));
        return comentario;
    } catch (error) {
        return { error: error.message };
    }
};


// Actualizar un Comentario
const actualizar = async (id, datos) => {
    try {
        return await Comentario.findByIdAndUpdate(id, datos, { new: true });
    } catch (error) {
        return { error: error.message };
    }
}

// Eliminar un Comentario
const eliminar = async (id) => {
    try {
        return await Comentario.findByIdAndDelete(id);
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { agregar, listar, obtenerPorId, actualizar, eliminar };