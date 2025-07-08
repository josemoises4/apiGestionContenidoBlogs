import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";

import Articulo from "../model/Articulo";
import Comentario from "../model/Comentario";
import { agregar, listar, obtenerPorId, actualizar } from "../service/ArticuloSERVICE";

const router = express.Router();

// Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "./public/uploads/articulos"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, nombre);
  },
});
const upload = multer({ storage });

/*============ CRUD DE ARTÍCULOS ============*/

// Crear artículo (con imagen)
router.post("/", upload.single("imagen"), async (req: Request, res: Response) => {
  try {
    const datos = req.body;

    if (!datos.titulo || !datos.contenido || !datos.categoria_id || !datos.usuario_id) {
      res.status(400).json({ error: "Faltan campos obligatorios" });
      return;
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
router.get("/", async (_req: Request, res: Response) => {
  try {
    const articulos = await listar();
    res.json(articulos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener artículos" });
  }
});

// Obtener artículo por ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const articulo = await obtenerPorId(id);

    if (!articulo || (articulo as any).error) {
      res.status(404).json({ error: "Artículo no encontrado" });
      return;
    }

    res.json(articulo);
  } catch (error) {
    console.error("Error al obtener artículo:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Actualizar artículo (con posible nueva imagen)
router.put("/:id", upload.single("imagen"), async (req: Request, res: Response) => {
  const { id } = req.params;
  const datos = req.body;

  try {
    if (req.file) {
      datos.imagen = `/uploads/articulos/${req.file.filename}`;
    }

    const resultado = await actualizar(id, datos);

    if (!resultado || (resultado as any).error) {
      res.status(404).json({ error: "No se pudo actualizar el artículo" });
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.error("Error al actualizar artículo:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Eliminar artículo y sus comentarios
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "ID de artículo inválido" });
      return;
    }

    const articulo = await Articulo.findById(id);
    if (!articulo) {
      res.status(404).json({ error: "Artículo no encontrado" });
      return;
    }

    await Comentario.deleteMany({ articulo_id: new mongoose.Types.ObjectId(id) });
    await Articulo.findByIdAndDelete(id);

    res.json({ mensaje: "Artículo y sus comentarios eliminados correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar artículo y comentarios:", error);
    res.status(500).json({ error: "Error del servidor al eliminar artículo y comentarios" });
  }
});

export default router;
