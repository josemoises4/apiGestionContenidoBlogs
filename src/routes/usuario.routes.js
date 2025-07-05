const express = require("express");
const router = express.Router();
const { agregar, listar } = require("../service/UsuarioSERVICE");

// Ruta para agregar un nuevo usuario
router.post("/", async (req, res) => {
    const resultado = await agregar(req.body);
    res.json(resultado);
});

// Ruta para listar todos los usuarios
router.get("/", async (req, res) => {
    const usuarios = await listar();
    res.json(usuarios);
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido: ", id);
    const usuario = await obtenerPorId(id);

    if (!usuario || usuario.error) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
});

// Actualizar un usuario
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    const resultado = await actualizar(id, datosActualizados);

    if (!resultado || resultado.error) {
        return res.status(404).json({ error: "No se pudo actualizar el usuario" });
    }

    res.json(resultado);
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const resultado = await eliminar(id);

    if (!resultado || resultado.error) {
        return res.status(404).json({ error: "No se pudo eliminar el usuario" });
    }

    res.json({ mensaje: "Usuario eliminado correctamente" });
});

module.exports = router;
