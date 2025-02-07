document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Cargar carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para actualizar la vista del carrito
    function displayCart() {
        cartContainer.innerHTML = ''; // Limpiar la tabla de productos previos
        let total = 0;

        cart.forEach(item => {
            const row = document.createElement("tr");

            // Mostrar nombre, precio, cantidad, total
            row.innerHTML = `
                <td>${item.product}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" class="form-control form-control-sm" onchange="updateQuantity('${item.product}', this.value)">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.product}')">Eliminar</button>
                </td>
            `;

            cartContainer.appendChild(row);

            total += item.price * item.quantity;
        });

        // Mostrar total actualizado
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Función para actualizar la cantidad de un producto
    function updateQuantity(product, quantity) {
        const item = cart.find(item => item.product === product);
        if (item) {
            item.quantity = parseInt(quantity);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }

    // Función para eliminar producto del carrito
    function removeFromCart(product) {
        const index = cart.findIndex(item => item.product === product);
        if (index !== -1) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }

    // Llamar a displayCart al cargar la página
    displayCart();

    // Si el usuario hace clic en "Proceder al Pago"
    checkoutBtn.addEventListener('click', function () {
        if (cart.length > 0) {
            alert("Procediendo al pago...");
            // Aquí iría la lógica para proceder con el pago
        } else {
            alert("Tu carrito está vacío.");
        }
    });
});
