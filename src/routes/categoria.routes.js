const express = require('express');
const router = express.Router();
const Categoria = require('../model/Categoria');
const { agregar, listar, obtenerPorId, actualizar, eliminar} = require('../service/CategoriaSERVICE');

// Agregar nueva categoría
router.post("/", async (req, res) => {
    const resultado = await agregar(req.body);
    res.json(resultado);
});

// Obtener todas las categorías
router.get("/", async (req, res) => {
    const categorias = await listar();
    res.json(categorias);
});

// Obtener categoría por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const categoria = await obtenerPorId(id);

    if (!categoria || categoria.error) {
        return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoria);
});

// Actualizar categoría
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const resultado = await actualizar(id, req.body);

    if (!resultado || resultado.error) {
        return res.status(404).json({ error: "No se pudo actualizar la categoría" });
    }

    res.json(resultado);
});

// Eliminar categoría
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const resultado = await eliminar(id);

    if (!resultado || resultado.error) {
        return res.status(404).json({ error: "No se pudo eliminar la categoría" });
    }

    res.json({ mensaje: "Categoría eliminada correctamente" });
});


/*============METODOS ESPECIALES (ya programados antes)============*/

router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;

    // Evitar duplicados
    const existe = await Categoria.findOne({ nombre });
    if (existe) return res.status(400).json({ error: "La categoría ya existe." });

    const nueva = new Categoria({ nombre });
    await nueva.save();

    res.status(201).json({ mensaje: "Categoría creada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría." });
  }
});

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find({}, "nombre"); // Solo el campo nombre
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías." });
  }
});

router.get('/nombre/:nombre', async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ nombre: req.params.nombre });
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
