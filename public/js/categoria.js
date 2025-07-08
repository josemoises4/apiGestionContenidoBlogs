const nuevaCatDiv = document.getElementById('nuevaCategoriaDiv');
const nuevaCatInput = document.getElementById('nuevaCategoria');

// Redireccionar al login si no hay usuario logueado
const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
if (!usuarioLogueado || !usuarioLogueado._id) {
  alert("Acceso no autorizado. Redirigiendo al login...");
  window.location.href = "login.html"; // o la ruta correcta según tu estructura
}

// Mostrar usuario y cargar categorías como radios
window.addEventListener('DOMContentLoaded', async () => {
  const usuarioDiv = document.getElementById('usuarioLogueado');
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario?.nombre) {
    usuarioDiv.textContent = `Usuario: ${usuario.nombre}`;
  } else {
    usuarioDiv.textContent = "Usuario no identificado";
  }

  await cargarCategorias();

  async function cargarCategorias(params) {
    const contenedor = document.getElementById("radioCategorias");
    contenedor.innerHTML = ""; //Limpiar radios actuales

    try {
    const res = await fetch("/api/categoria");
    const categorias = await res.json();

    categorias.forEach(cat => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "categoria";
      radio.value = cat.nombre;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + cat.nombre));
      contenedor.appendChild(label);
      contenedor.appendChild(document.createElement("br"));
    });

    // Agregar opción "Otra..."
    const otraLabel = document.createElement("label");
    const otraRadio = document.createElement("input");
    otraRadio.type = "radio";
    otraRadio.name = "categoria";
    otraRadio.value = "otra";
    otraRadio.id = "otraRadio";
    otraLabel.appendChild(otraRadio);
    otraLabel.appendChild(document.createTextNode(" Otra..."));
    contenedor.appendChild(otraLabel);
    contenedor.appendChild(document.createElement("br"));

    // Mostrar campo adicional si se selecciona "Otra..."
    contenedor.addEventListener("change", () => {
      const seleccion = document.querySelector('input[name="categoria"]:checked');
      const esOtra = seleccion?.value === "otra";
      nuevaCatDiv.style.display = esOtra ? "block" : "none";
      nuevaCatInput.required = esOtra;
    });

  } catch (err) {
    console.error("Error cargando categorías:", err);
  }};  
  

// Manejo del formulario
document.getElementById('formulario').addEventListener('submit', async (e) => {
  e.preventDefault();

  const seleccion = document.querySelector('input[name="categoria"]:checked');
  if (!seleccion) {
    alert("Debe seleccionar una categoría.");
    return;
  }

  let nombreCategoria = seleccion.value;

  if (nombreCategoria === "otra") {
    nombreCategoria = nuevaCatInput.value.trim();
    if (!nombreCategoria) {
      alert("Por favor escriba el nombre de la nueva categoría.");
      return;
    }

    // Crear categoría nueva en backend
    try {
      const res = await fetch("/api/categoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreCategoria })
      });

      const resultado = await res.json();

      if (!res.ok) {
        alert(resultado.error || "Error al crear la nueva categoría.");
        return;
      }

    } catch (err) {
      alert("Error al conectar con el servidor.");
      console.error(err);
      return;
    }
  }

  // Si es categoría existente o ya se creó, guardamos y redirigimos
  localStorage.setItem("categoriaSeleccionada", nombreCategoria);
  window.location.href = "FrmArticulo.html";
});
});
