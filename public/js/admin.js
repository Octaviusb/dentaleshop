document.getElementById("formularioProducto").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const imagen_url = document.getElementById("imagen_url").value;
    const stock = parseInt(document.getElementById("stock").value);
    const categoria = document.getElementById("categoria").value;

    fetch("/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            descripcion,
            precio,
            imagen_url,
            stock,
            categoria
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado:', data);
    })
    .catch(error => {
        console.error('Error al agregar producto:', error);
    });
});
