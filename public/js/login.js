document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  const respuesta = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contrasena })
  });

  const resultado = await respuesta.json();

  if (respuesta.ok) {
    alert("Bienvenido, acceso concedido");
    // Guardar info del usuario (ajusta según respuesta del servidor)
    localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
    // Redirigir a FrmCategoria.html
    window.location.href = "FrmCategoria.html";
  } else {
    alert(resultado.error || "Error en el inicio de sesión");
  }
});
