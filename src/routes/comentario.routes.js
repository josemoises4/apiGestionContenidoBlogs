const express = require("express");
const router = express.Router();
const { agregar, listar, obtenerPorId, actualizar, eliminar } = require("../service/ComentarioSERVICE");
const Comentario = require('../model/Comentario')

// Ruta para agregar un nuevo Comentario
router.post("/", async (req, res) => {
    console.log("Datos recibidos:",req.body);
    const resultado = await agregar(req.body);
    res.json(resultado);
});

// Ruta para listar todos los Comentarios
router.get("/", async (req, res) => {
    const comentarios = await listar();
    res.json(comentarios);
});

// Obtener un Comentario por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido: ", id);
    const comentario = await obtenerPorId(id);

    if (!comentario || comentario.error) {
        return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.json(comentario);
});

// Actualizar un Comentario
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    const resultado = await actualizar(id, datosActualizados);

    if (!resultado || resultado.error) {
        return res.status(404).json({ error: "No se pudo actualizar el Comentario" });
    }

    res.json(resultado);
});

// Eliminar un Comentario
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const resultado = await eliminar(id);

    if (!resultado || resultado.error) {
        return res.status(404).json({ error: "No se pudo eliminar el Comentario" });
    }

    res.json({ mensaje: "Comentario eliminado correctamente" });
});

// Obtener comentarios de un artículo específico
router.get("/articulo/:id", async (req, res) => {
  try {
    const comentarios = await Comentario.find({ articulo_id: req.params.id })
      .populate("usuario_id", "nombre")
      .sort({ fecha_publicacion: -1 });

    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener comentarios del artículo" });
  }
});

module.exports = router;
