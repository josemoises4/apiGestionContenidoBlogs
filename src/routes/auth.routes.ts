import { Router, RequestHandler } from "express";
import Usuario from "../model/Usuario";

const router = Router();

router.post("/", (async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, contrasena });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({ mensaje: "Inicio de sesión exitoso", usuario });
  } catch (err) {
    res.status(500).json({ error: "Error del servidor" });
  }
}) as RequestHandler);

export default router;
