// Mostrar usuario logueado
const usuario = JSON.parse(localStorage.getItem("usuario"));
const usuarioDiv = document.getElementById("usuarioLogueado");

if (usuario?.nombre) {
  usuarioDiv.textContent = `Usuario: ${usuario.nombre}`;
} else {
  usuarioDiv.textContent = "Usuario no identificado";
}

// Mostrar la categoría seleccionada
const categoriaNombre = localStorage.getItem("categoriaSeleccionada");
document.getElementById("categoriaElegida").textContent = "Categoría seleccionada: " + (categoriaNombre || "ninguna");

// Vista previa de imagen
const imagenInput = document.getElementById("imagen");
const preview = document.getElementById("previewImagen");

imagenInput.addEventListener("change", () => {
  const file = imagenInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Vista previa" />`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
  }
});

// Manejo del formulario para crear el artículo
document.getElementById("formArticulo").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const contenido = document.getElementById("contenido").value.trim();
  const imagenFile = imagenInput.files[0];

  if (!titulo || !contenido || !categoriaNombre || !usuario?._id) {
    alert("Todos los campos son obligatorios, incluido el usuario.");
    return;
  }

  try {
    // Buscar el ID de la categoría por su nombre
    const resCategoria = await fetch(`/api/categoria/nombre/${encodeURIComponent(categoriaNombre)}`);
    const catData = await resCategoria.json();

    if (!resCategoria.ok || !catData._id) {
      alert("No se encontró la categoría.");
      return;
    }

    const categoria_id = catData._id;

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("contenido", contenido);
    formData.append("categoria_id", categoria_id);
    formData.append("usuario_id", usuario._id);
    if (imagenFile) {
      formData.append("imagen", imagenFile);
    }

    const res = await fetch("/api/articulo", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert(data.mensaje || data.error);

    if (res.ok) {
      document.getElementById("formArticulo").reset();
      preview.innerHTML = "";
      window.location.href = "panel.html";
    }

  } catch (err) {
    console.error("Error al publicar:", err);
    alert("Error al conectar con el servidor.");
  }
});
  