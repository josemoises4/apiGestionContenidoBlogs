// Redireccionar al login si no hay usuario logueado
const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
if (!usuarioLogueado || !usuarioLogueado._id) {
  alert("Acceso no autorizado. Redirigiendo al login...");
  window.location.href = "login.html"; // o la ruta correcta según tu estructura
}

document.getElementById("usuarioForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;
    const rol = document.getElementById("rol").value;

    const respuesta = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, contrasena, rol })
    });

    const resultado = await respuesta.json();
    alert(resultado.mensaje || resultado.error);

    if(respuesta.ok){
        document.getElementById("usuarioForm").reset();
    }
});
