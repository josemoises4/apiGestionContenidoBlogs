import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { agregar, listar, obtenerPorId, actualizar, eliminar } from "../service/ComentarioSERVICE";
import Comentario from "../model/Comentario";

const router = express.Router();

// Ruta para agregar un nuevo Comentario
router.post("/", async (req: Request, res: Response) => {
  try {
    const { articulo_id, contenido, usuario_id } = req.body;

    console.log("Datos recibidos:", req.body);

    if (!articulo_id || !contenido || !usuario_id) {
      res.status(400).json({ error: "Faltan datos requeridos (articulo_id, contenido, usuario_id)." });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(articulo_id)) {
      res.status(400).json({ error: "El articulo_id no es un ObjectId válido." });
      return;
    }

    const resultado = await agregar(req.body);
    res.json(resultado);
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Ruta para listar todos los Comentarios
router.get("/", async (_req: Request, res: Response) => {
  try {
    const comentarios = await listar();
    res.json(comentarios);
  } catch (error) {
    console.error("Error al listar comentarios:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Obtener un Comentario por ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    console.log("ID recibido: ", id);
    const comentario = await obtenerPorId(id);

    if (!comentario || (comentario as any).error) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }

    res.json(comentario);
  } catch (error) {
    console.error("Error al obtener comentario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Actualizar un Comentario
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const resultado = await actualizar(id, datosActualizados);

    if (!resultado || (resultado as any).error) {
      res.status(404).json({ error: "No se pudo actualizar el Comentario" });
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.error("Error al actualizar comentario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Eliminar un Comentario
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const resultado = await eliminar(id);

    if (!resultado || (resultado as any).error) {
      res.status(404).json({ error: "No se pudo eliminar el Comentario" });
      return;
    }

    res.json({ mensaje: "Comentario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Obtener comentarios de un artículo específico
router.get("/articulo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "ID de artículo inválido o no proporcionado." });
      return;
    }

    const comentarios = await Comentario.find({ articulo_id: id })
      .populate("usuario_id", "nombre")
      .sort({ fecha_publicacion: -1 });

    res.json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios del artículo:", error);
    res.status(500).json({ error: "Error al obtener comentarios del artículo" });
  }
});

export default router;
