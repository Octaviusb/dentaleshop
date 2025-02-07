    async function loadProducts() {
        // Cargar el archivo CSV
        const response = await fetch('data/productos.csv'); // Ruta al archivo CSV
        const data = await response.text();

        // Procesar los datos
        const rows = data.split('\n').slice(1); // Dividir las filas, omitir la cabecera
        const productList = document.getElementById('product-list');

        rows.forEach(row => {
            const [nombre, precio, imagen] = row.split(',');

            if (nombre && precio && imagen) {
                // Crear el HTML para un producto
                const productHTML = `
                    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <div class="product-item bg-light mb-4">
                            <div class="product-img position-relative overflow-hidden">
                                <img class="img-fluid w-100" src="${imagen.trim()}" alt="${nombre.trim()}">
                                <div class="product-action">
                                    <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-shopping-cart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href="#"><i class="far fa-heart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-sync-alt"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="text-center py-4">
                                <a class="h6 text-decoration-none text-truncate" href="#">${nombre.trim()}</a>
                                <div class="d-flex align-items-center justify-content-center mt-2">
                                    <h5>$${parseFloat(precio.trim()).toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Insertar el HTML en el contenedor
                productList.innerHTML += productHTML;
            }
        });
    }

    // Cargar los productos al cargar la página
    document.addEventListener('DOMContentLoaded', loadProducts);
