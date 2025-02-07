document.addEventListener('DOMContentLoaded', function() {
    let productos = [];  // Define y llena esta variable adecuadamente.
    let carrito = [];
    const carritoItems = document.getElementById('carrito-items');
    const total = document.getElementById('total');

    function agregarAlCarrito(event) {
        const productId = parseInt(event.target.dataset.id);
        const producto = productos.find(item => item.id === productId);
        if (producto) {
            const itemExistente = carrito.find(item => item.id === productId);
            if (itemExistente) {
                itemExistente.cantidad++;
            } else {
                carrito.push({ ...producto, cantidad: 1 });
            }
            renderizarCarrito();
        }
    }

    function renderizarCarrito() {
        carritoItems.innerHTML = '';
        carrito.forEach(item => {
            const carritoItem = document.createElement('li');
            carritoItem.classList.add('carrito-item');
            carritoItem.innerHTML = `
                ${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${(item.precio * item.cantidad).toFixed(2)}
                <button data-id="${item.id}">Eliminar</button>
            `;
            carritoItem.querySelector('button').addEventListener('click', eliminarDelCarrito);
            carritoItems.appendChild(carritoItem);
        });
        calcularTotal();
    }

    function eliminarDelCarrito(event) {
        const itemId = parseInt(event.target.dataset.id);
        carrito = carrito.filter(item => item.id !== itemId);
        renderizarCarrito();
    }

    function calcularTotal() {
        const totalPagar = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
        total.textContent = `$${totalPagar.toFixed(2)}`;
    }

    function validarFormularioPago() {
        const formaPago = document.querySelector('input[name="formaPago"]:checked').value;
        const nombre = document.getElementById('nombre').value;
        const codigoPostal = document.getElementById('codigoPostal').value;

        const regexNombre = /^[a-zA-Z\s]+$/;
        const regexCodigoPostal = /^\d{5}$/;

        if (formaPago === 'efectivo') {
            if (!regexNombre.test(nombre)) {
                alert('Por favor, ingrese un nombre válido.');
                return false;
            }
            if (!regexCodigoPostal.test(codigoPostal)) {
                alert('Por favor, ingrese un código postal válido (5 dígitos).');
                return false;
            }
            return true;
        }

        const tarjeta = document.getElementById('tarjeta').value;
        const fechaVencimiento = document.getElementById('fechaVencimiento').value;
        const codigoSeguridad = document.getElementById('codigoSeguridad').value;

        const regexTarjeta = /^[0-9]{16}$/;
        const regexFechaVencimiento = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const regexCodigoSeguridad = /^[0-9]{3,4}$/;

        if (!regexNombre.test(nombre)) {
            alert('Por favor, ingrese un nombre válido.');
            return false;
        }
        if (!regexTarjeta.test(tarjeta)) {
            alert('Por favor, ingrese un número de tarjeta válido (16 dígitos).');
            return false;
        }
        if (!regexFechaVencimiento.test(fechaVencimiento)) {
            alert('Por favor, ingrese una fecha de vencimiento válida (MM/AA).');
            return false;
        }
        if (!regexCodigoSeguridad.test(codigoSeguridad)) {
            alert('Por favor, ingrese un código de seguridad válido (3 o 4 dígitos).');
            return false;
        }
        if (!regexCodigoPostal.test(codigoPostal)) {
            alert('Por favor, ingrese un código postal válido (5 dígitos).');
            return false;
        }
        return true;
    }

    const procederPagoBtn = document.getElementById('procederPagoBtn');
    if (procederPagoBtn) {
        procederPagoBtn.addEventListener('click', function() {
            // Tu lógica aquí
        });
    }

    const procederPagoTarjetaBtn = document.getElementById('procederPagoTarjetaBtn');
    if (procederPagoTarjetaBtn) {
        procederPagoTarjetaBtn.addEventListener('click', () => {
            if (validarFormularioPago()) {
                procederPagoConTarjeta();
            } else {
                alert('Por favor, complete correctamente el formulario de pago.');
            }
        });
    }

    const procederPagoEfectivoBtn = document.getElementById('procederPagoEfectivoBtn');
    if (procederPagoEfectivoBtn) {
        procederPagoEfectivoBtn.addEventListener('click', () => {
            if (validarFormularioPago()) {
                procederPagoEnEfectivo();
            } else {
                alert('Por favor, complete correctamente el formulario de pago.');
            }
        });
    }

    function renderizarProductos() {
        // Implementa tu lógica para renderizar los productos en la tienda
    }

    renderizarProductos();
});
