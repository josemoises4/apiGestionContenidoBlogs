// Redireccionar al login si no hay usuario logueado
const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
if (!usuarioLogueado || !usuarioLogueado._id) {
  alert("Acceso no autorizado. Redirigiendo al login...");
  window.location.href = "login.html"; // o la ruta correcta según tu estructura
}

//Mostrar usuario logueado
window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioDiv = document.getElementById("usuarioLogueado");

  if (usuario?.nombre) {
    usuarioDiv.textContent = `Usuario: ${usuario.nombre}`;
  } else {
    usuarioDiv.textContent = "Usuario no identificado";
  }
});

// Cerrar sesión
const cerrarSesionBtn = document.getElementById("cerrarSesion");
if (cerrarSesionBtn) {
  cerrarSesionBtn.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "login.html"; // o la ruta de tu pantalla principal
  });
}

async function cargarArticulos() {
  try {
    const res = await fetch("/api/articulo");
    if (!res.ok) throw new Error("Error al cargar artículos");
    const articulos = await res.json();

    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    articulos.forEach(async a => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.dataset.id = a._id;

      const renderCard = (titulo, contenido) => {
  const imagenHTML = a.imagen
    ? `<img src="${a.imagen}" class="post-imagen" alt="Imagen del artículo">`
    : "";

card.innerHTML = `
  <div class="post-title">
    <a href="/api/articulo/${a._id}" target="_blank" class="enlace-api">${titulo}</a>
  </div>
  ${imagenHTML}
  <div class="post-content">${contenido}</div>
  <div class="post-actions">
    <span class="icon editar" title="Editar">✏️</span>
    <span class="icon eliminar" title="Eliminar">❌</span>
    <span class="icon favorito" title="Comentar">💬 <span class="comentario-contador">0</span></span>
  </div>
`;



        const eliminarBtn = card.querySelector(".eliminar");
        eliminarBtn.addEventListener("click", async () => {
          const confirmar = confirm("¿Seguro que deseas eliminar este artículo?");
          if (!confirmar) return;

          try {
            const resp = await fetch(`/api/articulo/${a._id}`, {
              method: "DELETE"
            });

            if (!resp.ok) throw new Error("Error al eliminar");

            card.remove();
          } catch (err) {
            console.error(err);
            alert("Error al eliminar el artículo.");
          }
        });

        const editarBtn = card.querySelector(".editar");
        editarBtn.addEventListener("click", () => {
          card.innerHTML = `
            <div class="post-title">
              <input type="text" value="${titulo}" style="width: 100%; font-size: 1em;" />
            </div>
            <div class="post-content">
              <textarea style="width: 100%; height: 100px;">${contenido}</textarea>
            </div>
            <div class="post-actions">
              <button class="guardar">💾 Guardar</button>
              <button class="cancelar">❌ Cancelar</button>
            </div>
          `;

          const inputTitulo = card.querySelector("input");
          const inputContenido = card.querySelector("textarea");
          const guardarBtn = card.querySelector(".guardar");
          const cancelarBtn = card.querySelector(".cancelar");

          guardarBtn.addEventListener("click", async () => {
            const nuevoTitulo = inputTitulo.value.trim();
            const nuevoContenido = inputContenido.value.trim();

            if (!nuevoTitulo || !nuevoContenido) {
              alert("Título y contenido no pueden estar vacíos.");
              return;
            }

            try {
              const resp = await fetch(`/api/articulo/${a._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  titulo: nuevoTitulo,
                  contenido: nuevoContenido
                })
              });

              if (!resp.ok) throw new Error("Error al actualizar");

              renderCard(nuevoTitulo, nuevoContenido);
            } catch (err) {
              console.error(err);
              alert("No se pudo actualizar el artículo.");
            }
          });

          cancelarBtn.addEventListener("click", () => {
            renderCard(titulo, contenido);
          });
        });
      };

      renderCard(a.titulo, a.contenido);

      // Panel de comentarios (inicialmente oculto)
      const comentariosDiv = document.createElement("div");
      comentariosDiv.className = "post-comments";
      comentariosDiv.style.display = "none";
      comentariosDiv.innerHTML = `
        <textarea class="nuevo-comentario" placeholder="Escribe tu comentario..."></textarea>
        <button class="btn-enviar-comentario">Enviar</button>
        <div class="comentarios-existentes">Cargando comentarios...</div>
      `;
      card.appendChild(comentariosDiv);

      const comentarBtn = card.querySelector(".favorito");
      const textarea = comentariosDiv.querySelector(".nuevo-comentario");
      const boton = comentariosDiv.querySelector(".btn-enviar-comentario");
      const listaComentarios = comentariosDiv.querySelector(".comentarios-existentes");
      const contador = card.querySelector(".comentario-contador");

      comentarBtn.addEventListener("click", async () => {
        const visible = comentariosDiv.style.display === "flex";
        document.querySelectorAll(".post-comments").forEach(div => {
          div.style.display = "none";
        });

        if (!visible) {
          comentariosDiv.style.display = "flex";
          await cargarComentarios(a._id, listaComentarios, contador);
        }
      });

      boton.addEventListener("click", async () => {
        const contenido = textarea.value.trim();
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!contenido || !usuario?._id) {
          alert("El comentario y el usuario son obligatorios.");
          return;
        }

        try {
          const res = await fetch("/api/comentario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contenido,
              usuario_id: usuario._id,
              articulo_id: a._id
            })
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Error al comentar");

          textarea.value = "";
          await cargarComentarios(a._id, listaComentarios, contador);
        } catch (err) {
          console.error(err);
          alert("Error al enviar el comentario.");
        }
      });

      // Contador inicial
      try {
        const resComentarios = await fetch(`/api/comentario/articulo/${a._id}`);
        if (!resComentarios.ok) throw new Error("Error al obtener comentarios");
        const comentarios = await resComentarios.json();
        contador.textContent = comentarios.length;
      } catch (err) {
        console.error("Error cargando contador de comentarios:", err);
      }

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert("No se pudieron cargar los artículos.");
  }
}

async function cargarComentarios(articuloId, contenedor, contadorSpan) {
  try {
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"));

    const res = await fetch(`/api/comentario/articulo/${articuloId}`);
    if (!res.ok) throw new Error("Error al obtener comentarios");
    const comentarios = await res.json();

    if (comentarios.length === 0) {
      contenedor.innerHTML = "<p style='color: #666;'>No hay comentarios aún.</p>";
    } else {
      contenedor.innerHTML = "";

      comentarios.forEach(c => {
        const div = document.createElement("div");
        div.className = "comentario";

        const esPropio = usuarioActual && c.usuario_id?._id === usuarioActual._id;

        div.innerHTML = `
          <strong>${c.usuario_id?.nombre || "Anónimo"}:</strong>
          <p class="texto-comentario">${c.contenido}</p>
          <small>${new Date(c.fecha_publicacion).toLocaleString()}</small>
          ${esPropio ? `
            <div class="acciones-comentario">
              <span class="icon editar-comentario" title="Editar">✏️</span>
              <span class="icon eliminar-comentario" title="Eliminar">🗑️</span>
            </div>
          ` : ""}
        `;

        // Eliminar comentario
        if (esPropio) {
          div.querySelector(".eliminar-comentario").addEventListener("click", async () => {
            const confirmar = confirm("¿Eliminar este comentario?");
            if (!confirmar) return;

            try {
              const resDel = await fetch(`/api/comentario/${c._id}`, {
                method: "DELETE"
              });

              if (!resDel.ok) throw new Error("No se pudo eliminar el comentario");
              await cargarComentarios(articuloId, contenedor, contadorSpan);
            } catch (err) {
              console.error(err);
              alert("Error al eliminar comentario.");
            }
          });

          // Editar comentario
          div.querySelector(".editar-comentario").addEventListener("click", () => {
            const p = div.querySelector(".texto-comentario");
            const original = p.textContent;

            p.outerHTML = `
              <textarea class="edicion-comentario" style="width: 100%; height: 60px;">${original}</textarea>
              <button class="guardar-edicion">Guardar</button>
              <button class="cancelar-edicion">Cancelar</button>
            `;

            const textarea = div.querySelector(".edicion-comentario");
            const btnGuardar = div.querySelector(".guardar-edicion");
            const btnCancelar = div.querySelector(".cancelar-edicion");

            btnGuardar.addEventListener("click", async () => {
              const nuevoTexto = textarea.value.trim();
              if (!nuevoTexto) {
                alert("El comentario no puede estar vacío.");
                return;
              }

              try {
                const resEdit = await fetch(`/api/comentario/${c._id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ contenido: nuevoTexto })
                });

                if (!resEdit.ok) throw new Error("Error al editar comentario");
                await cargarComentarios(articuloId, contenedor, contadorSpan);
              } catch (err) {
                console.error(err);
                alert("Error al actualizar comentario.");
              }
            });

            btnCancelar.addEventListener("click", () => {
              cargarComentarios(articuloId, contenedor, contadorSpan);
            });
          });
        }

        contenedor.appendChild(div);
      });
    }

    if (contadorSpan) contadorSpan.textContent = comentarios.length;
  } catch (err) {
    console.error(err);
    contenedor.innerHTML = "<p style='color: red;'>Error al cargar comentarios.</p>";
    if (contadorSpan) contadorSpan.textContent = "0";
  }
}

cargarArticulos();
