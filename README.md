# 📘 API de Gestión de Contenidos y Blogs

Este proyecto es una API RESTful desarrollada con **Node.js**, **TypeScript** y **MongoDB**, orientada a la gestión de artículos, categorías, usuarios y comentarios, con autenticación y manejo de imágenes.

---

## 🚀 Tecnologías Usadas

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** con Mongoose
- **Multer** para subida de imágenes
- **JWT (jsonwebtoken)** para autenticación
- **Joi** para validaciones
- **dotenv** para variables de entorno
- **CORS**

---


## 📁 Estructura del Proyecto

```plaintext
.
├── dist/                  # Código transpilado (ignorado en git)
├── src/
│   ├── model/
│   ├── routes/
│   ├── service/
│   ├── util/
│   ├── public/            # Archivos estáticos (HTML, JS, CSS, imágenes)
│   └── server.ts          # Punto de entrada del servidor
├── .env                   # Variables de entorno (ignorado)
├── .gitignore
├── package.json
└── tsconfig.json

```

## ⚙️ Variables de Entorno
El archivo .env debe contener lo siguiente:
PORT=3000
MONGO_URI=mongodb://localhost:27017/nombre_de_tu_base

## 📦 Instalación
npm install

## Dependencias instaladas
### Desarrollo
npm install typescript ts-node @types/node --save-dev
npm install --save-dev @types/express @types/cors @types/multer

### Producción
npm install express mongoose multer dotenv joi cors jsonwebtoken

## 🛠️ Scripts
### Compilar TypeScript a JavaScript
npm run build

### Ejecutar el proyecto desde dist/
npm run start

// package.json
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js"
}

## 🔐 Seguridad
Se utiliza token JWT para autenticar al usuario.

El frontend verifica si hay un usuario en localStorage y redirige al login si no lo hay.

Las rutas protegidas no deben ser accesibles directamente sin iniciar sesión.

--- 
| Método | Ruta            | Descripción                 |
| ------ | --------------- | --------------------------- |
| GET    | /api/usuario    | Listar usuarios             |
| POST   | /api/usuario    | Crear usuario               |
| POST   | /api/login      | Autenticación de usuario    |
| GET    | /api/categoria  | Listar categorías           |
| POST   | /api/categoria  | Crear categoría             |
| GET    | /api/articulo   | Listar artículos            |
| POST   | /api/articulo   | Crear artículo (con imagen) |
| GET    | /api/comentario | Listar comentarios          |
| POST   | /api/comentario | Crear comentario            |

## 🖼️ Manejo de Archivos Estáticos
Los archivos HTML, CSS y JS se encuentran en: src/public/html/
Accesibles vía:
http://localhost:3000/html/inicio.html

### Las imágenes subidas se almacenan en:
http://localhost:3000/uploads/

## 🧠 Autor
Desarrollado por [José Moises Grados]
Estudiante de Sistemas de Información
Apasionado por el backend y la eficiencia del código.

## 📝 Licencia
Este proyecto es de uso académico y puede ser adaptado y reutilizado libremente.