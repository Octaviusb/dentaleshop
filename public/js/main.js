document.addEventListener('DOMContentLoaded', function () {
    let carrito = [];
    const carritoItems = document.getElementById('carrito-items');
    const total = document.getElementById('total');
    const pagarConWompiBtn = document.getElementById('pagarConWompi');

    pagarConWompiBtn.addEventListener('click', () => {
        if (carrito.length > 0) {
            procesarPagoConWompi();
        } else {
            alert('El carrito está vacío. Por favor, agregue productos antes de pagar.');
        }
    });

    function renderizarCarrito() {
        carritoItems.innerHTML = '';
        carrito.forEach(item => {
            const carritoItem = document.createElement('li');
            carritoItem.innerHTML = `
                ${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${(item.precio * item.cantidad).toFixed(2)}
                <button data-id="${item.id}">Eliminar</button>
            `;
            carritoItem.querySelector('button').addEventListener('click', eliminarDelCarrito);
            carritoItems.appendChild(carritoItem);
        });
        calcularTotal();
    }

    function calcularTotal() {
        const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
        total.textContent = `$${subtotal.toFixed(2)}`;
    }

    function eliminarDelCarrito(event) {
        const itemId = parseInt(event.target.dataset.id);
        carrito = carrito.filter(item => item.id !== itemId);
        renderizarCarrito();
    }

    function procesarPagoConWompi() {
        const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
        const envio = 10; // Costo de envío
        const total = subtotal + envio;

        window.location.href = `https://checkout.wompi.co/?public-key=TU_PUBLIC_KEY&currency=COP&amount-in-cents=${total * 100}&reference=mi-carrito-123&redirect-url=http://tu-sitio.com/gracias`;
    }

    // Inicializar carrito con productos para prueba
    carrito = [
        { id: 1, nombre: 'Producto A', precio: 50000, cantidad: 1 },
        { id: 2, nombre: 'Producto B', precio: 30000, cantidad: 2 }
    ];
    renderizarCarrito();
});
