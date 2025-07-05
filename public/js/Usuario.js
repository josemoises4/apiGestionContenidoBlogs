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
