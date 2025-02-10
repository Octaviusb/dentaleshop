document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const cartContainer = document.getElementById("cart-items"); // Contenedor donde se mostrará el carrito

    // Cargar los productos desde el archivo CSV
    Papa.parse('/data/productos.csv', {
        download: true,
        header: true,
        complete: function (results) {
            const productos = results.data.filter(producto => producto.imagen && producto.nombre && producto.precio);
            if (productos.length === 0) {
                productList.innerHTML = '<p class="text-muted">No hay productos disponibles.</p>';
                return;
            }
            productos.forEach(producto => {
                const productItem = document.createElement("div");
                productItem.className = "col-lg-3 col-md-4 col-sm-6 pb-3";
                productItem.innerHTML = `
                    <div class="card h-100">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text text-primary">${producto.precio}</p>
                            <button class="btn btn-sm btn-outline-primary" onclick="addToCart('${producto.nombre}', ${parseFloat(producto.precio.replace(/[^\d.-]/g, ''))})">Añadir al carrito</button>
                        </div>
                    </div>
                `;
                productList.appendChild(productItem);
            });
        },
        error: function (err) {
            console.error("Error al cargar productos:", err);
            productList.innerHTML = '<p class="text-danger">Error al cargar productos.</p>';
        }
    });

    // Obtener carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para agregar productos al carrito
    window.addToCart = function (product, price) { // Hacer la función accesible globalmente
        console.log(`Producto añadido: ${product}, Precio: ${price}`); // Verifica que el evento se dispare
        const existingProduct = cart.find(item => item.product === product);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ product, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    // Función para mostrar los productos del carrito en la interfaz
    function displayCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = ''; // Limpiar el contenido previo

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
            return;
        }

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p>${item.product} - $${item.price} x ${item.quantity}</p>
            `;
            cartContainer.appendChild(itemElement);
        });
    }

    // Llamar a displayCart al cargar la página para mostrar los productos del carrito si existen
    displayCart();
});
