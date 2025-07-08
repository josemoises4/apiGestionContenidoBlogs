  import express from "express";
  import bodyParser from "body-parser";
  import path from "path";
  import cors from "cors";

  import { conectar } from './util/Conexion';

  // Importar rutas
  import usuarioRoutes from "./routes/usuario.routes";
  import  inicioRoutes from "./routes/inicio.routes";
  import authRoutes from "./routes/auth.routes";
  import categoriaRoutes from './routes/categoria.routes';
  import articuloRoutes from './routes/articulo.routes';
  import comentarioRoutes from './routes/comentario.routes';

  console.log(usuarioRoutes.stack);
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "../public")));
  app.use('/uploads', express.static('uploads'));

  // Conectar a la base de datos
  conectar();

  // Usar las rutas
  app.use("/api/usuario", usuarioRoutes);
  app.use("/", inicioRoutes);
  app.use("/api/login", authRoutes);
  app.use("/api/categoria", categoriaRoutes);
  app.use("/api/articulo", articuloRoutes);
  app.use("/api/comentario", comentarioRoutes);

  // Redirigir '/' a '/inicio'
  app.get("/", (req, res) => {
      res.redirect("/inicio");
  });

  // Iniciar servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

