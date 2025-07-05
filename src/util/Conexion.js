const mongoose = require("mongoose");
require("dotenv").config();

const conectar = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("❌ Error en la conexión a MongoDB:", error);
    process.exit(1);
  }
};

module.exports = conectar;
