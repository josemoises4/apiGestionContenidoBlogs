const mongoose = require("mongoose");
const Articulo = require("../src/model/Articulo");

const MONGO_URI = "mongodb://localhost:27017/BDFinal";

mongoose.connect(MONGO_URI)
  .then(async () => {
    // Elimina artículos anteriores si deseas
    await Articulo.deleteMany({});

    // Crea artículos nuevos
    await Articulo.insertMany([
      {
        titulo: "Visita a Machu Picchu",
        contenido: "Una experiencia inolvidable en las alturas del Perú.",
        imagen: "/uploads/articulos/machu.jpg",
        estado: "Publicado",
        categoria_id: "6844e7c0451d0861ff61f7a4", // Usa un ID válido
        usuario_id: "68446db7594f4d5be7efbd77",  // Usa un ID válido
        fecha_publicacion: new Date()
      },
      {
        titulo: "La mejor pizza en Roma",
        contenido: "Descubre los sabores auténticos de Italia.",
        imagen: "/uploads/articulos/roma-pizza.jpg",
        estado: "Publicado",
        categoria_id: "68687190e5eab18c7ec9d355",
        usuario_id: "68446db7594f4d5be7efbd77",
        fecha_publicacion: new Date()
      }
    ]);

    console.log("🎉 Artículos estáticos insertados");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error al conectar:", err);
  });
