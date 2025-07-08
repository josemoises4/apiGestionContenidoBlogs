import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const conectar = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("✅ Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("❌ Error en la conexión a MongoDB:", error);
    process.exit(1);
  }
};
