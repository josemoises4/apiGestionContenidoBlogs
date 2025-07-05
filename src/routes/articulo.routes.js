const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Articulo = require('../model/Articulo');
const { agregar, listar, obtenerPorId, actualizar, eliminar } = require('../service/ArticuloSERVICE');

// Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads/articulos"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, nombre);
  }
});
const upload = multer({ storage });

/*============ CRUD DE ARTÍCULOS ============*/

// Crear artículo (con imagen)
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const datos = req.body;

    if (!datos.titulo || !datos.contenido || !datos.categoria_id || !datos.usuario_id) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (req.file) {
      datos.imagen = `/uploads/articulos/${req.file.filename}`;
    }

    const resultado = await agregar(datos);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error al crear artículo:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Listar artículos
router.get('/', async (req, res) => {
  try {
    const articulos = await listar();
    res.json(articulos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
});

// Obtener artículo por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const articulo = await obtenerPorId(id);

  if (!articulo || articulo.error) {
    return res.status(404).json({ error: "Artículo no encontrado" });
  }

  res.json(articulo);
});

// Actualizar artículo (con posible nueva imagen)
router.put("/:id", upload.single("imagen"), async (req, res) => {
  const { id } = req.params;
  const datos = req.body;

  if (req.file) {
    datos.imagen = `/uploads/articulos/${req.file.filename}`;
  }

  const resultado = await actualizar(id, datos);

  if (!resultado || resultado.error) {
    return res.status(404).json({ error: "No se pudo actualizar el artículo" });
  }

  res.json(resultado);
});

// Eliminar artículo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resultado = await eliminar(id);

  if (!resultado || resultado.error) {
    return res.status(404).json({ error: "No se pudo eliminar el artículo" });
  }

  res.json({ mensaje: "Artículo eliminado correctamente" });
});

module.exports = router;
