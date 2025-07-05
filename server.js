const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const conectar = require("./src/util/Conexion");

// Importar rutas
const usuarioRoutes = require("./src/routes/usuario.routes");
const inicioRoutes = require("./src/routes/inicio.routes");
const authRoutes = require("./src/routes/auth.routes");
const categoriaRoutes = require('./src/routes/categoria.routes');
const articuloRoutes = require('./src/routes/articulo.routes');
const comentarioRoutes = require('./src/routes/comentario.routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));

// Conectar a la base de datos
conectar();

// Usar las rutas
app.use("/api/usuarios", usuarioRoutes);
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

