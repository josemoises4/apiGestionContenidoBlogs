import { Router, RequestHandler } from "express";
import Categoria from "../model/Categoria";
import { agregar, listar, obtenerPorId, actualizar, eliminar } from "../service/CategoriaSERVICE";

const router = Router();

// Agregar nueva categoría (con verificación de duplicado)
router.post("/", (async (req, res) => {
    try {
        const { nombre } = req.body;

        // Validar existencia previa
        const existe = await Categoria.findOne({ nombre });
        if (existe) return res.status(400).json({ error: "La categoría ya existe." });

        const resultado = await agregar({ nombre });
        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la categoría." });
    }
}) as RequestHandler);

// Obtener todas las categorías
router.get("/", (async (_req, res) => {
    try {
        const categorias = await listar();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las categorías." });
    }
}) as RequestHandler);

// Obtener categoría por ID
router.get("/:id", (async (req, res) => {
    const { id } = req.params;
    const categoria = await obtenerPorId(id);

    if (!categoria || (categoria as any).error) {
        return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoria);
}) as RequestHandler);

// Obtener categoría por nombre
router.get("/nombre/:nombre", (async (req, res) => {
    try {
        const categoria = await Categoria.findOne({ nombre: req.params.nombre });
        if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
        res.json(categoria);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}) as RequestHandler);

// Actualizar categoría
router.put("/:id", (async (req, res) => {
    const { id } = req.params;
    const resultado = await actualizar(id, req.body);

    if (!resultado || (resultado as any).error) {
        return res.status(404).json({ error: "No se pudo actualizar la categoría" });
    }

    res.json(resultado);
}) as RequestHandler);

// Eliminar categoría
router.delete("/:id", (async (req, res) => {
    const { id } = req.params;
    const resultado = await eliminar(id);

    if (!resultado || (resultado as any).error) {
        return res.status(404).json({ error: "No se pudo eliminar la categoría" });
    }

    res.json({ mensaje: "Categoría eliminada correctamente" });
}) as RequestHandler);

export default router;
