import express, { RequestHandler } from "express";
const router = express.Router();

import { agregar, listar, obtenerPorId, actualizar, eliminar } from "../service/UsuarioSERVICE";

// Ruta para agregar un nuevo usuario
router.post("/", (async (req, res) => {
    const resultado = await agregar(req.body);
    res.json(resultado);
}) as RequestHandler);

// Ruta para listar todos los usuarios
router.get("/", (async (req, res) => {
    const usuarios = await listar();
    res.json(usuarios);
}) as RequestHandler);

// Obtener un usuario por ID
router.get("/:id", (async (req, res) => {
    const { id } = req.params;
    const usuario = await obtenerPorId(id);
    if (!usuario || (usuario as any).error) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
}) as RequestHandler);

// Actualizar un usuario
router.put("/:id", (async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    const resultado = await actualizar(id, datosActualizados);
    if (!resultado || (resultado as any).error) {
        return res.status(404).json({ error: "No se pudo actualizar el usuario" });
    }
    res.json(resultado);
}) as RequestHandler);

// Eliminar un usuario
router.delete("/:id", (async (req, res) => {
    const { id } = req.params;
    const resultado = await eliminar(id);
    if (!resultado || (resultado as any).error) {
        return res.status(404).json({ error: "No se pudo eliminar el usuario" });
    }
    res.json({ mensaje: "Usuario eliminado correctamente" });
}) as RequestHandler);

export default router;
