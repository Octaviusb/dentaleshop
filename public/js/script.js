document.addEventListener("DOMContentLoaded", function () {
    const loginIcon = document.getElementById("login-icon");
    const heartIcon = document.getElementById("heart-icon");
    const cartIcon = document.getElementById("cart-icon");

    loginIcon.addEventListener("click", function () {
        abrirPopup("login-popup");
    });

    heartIcon.addEventListener("click", function () {
        abrirPopup("heart-popup");
    });

    cartIcon.addEventListener("click", function () {
        abrirPopup("cart-popup");
    });
});

function abrirPopup(id) {
    document.getElementById(id).style.display = "flex";
}

function cerrarPopup(id) {
    document.getElementById(id).style.display = "none";
}


    function renderizarProductos() {
        // Implementa tu lógica para renderizar los productos en la tienda
    }

    renderizarProductos();
});
