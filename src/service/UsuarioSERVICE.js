const Usuario = require('../model/Usuario');
const mongoose = require("mongoose");

const agregar = async (datos) => {
    try {
        const nuevoUsuario = new Usuario(datos);
        await nuevoUsuario.save();
        return { mensaje: "Usuario agregado con éxito" };
    } catch (error) {
        return { error: error.message}
    }
}

const listar = async() => {
    try {
        return await Usuario.find();
    } catch (error) {
        return { error: error.message };
    }
}

const obtenerPorId = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: "ID inválido" };
        }

        const usuario = await Usuario.findById(new mongoose.Types.ObjectId(id));
        return usuario;
    } catch (error) {
        return { error: error.message };
    }
};


// Actualizar un usuario
const actualizar = async (id, datos) => {
    try {
        return await Usuario.findByIdAndUpdate(id, datos, { new: true });
    } catch (error) {
        return { error: error.message };
    }
}

// Eliminar un usuario
const eliminar = async (id) => {
    try {
        return await Usuario.findByIdAndDelete(id);
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { agregar, listar, obtenerPorId, actualizar, eliminar };