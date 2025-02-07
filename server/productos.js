const express = require('express');
const db = require('./db'); // Importar la conexión a la base de datos
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Importar el módulo csv-parser
const router = express.Router();

// Ruta POST para insertar productos desde un archivo CSV
router.post("/insertar-multiples", (req, res) => {
    const productos = []; // Array para almacenar los productos leídos

    // Lee el archivo CSV y convierte cada fila a un objeto
    fs.createReadStream(path.join(__dirname, '../productos.csv'))
        .pipe(csv()) // Usa csv-parser para leer el CSV
        .on('data', (row) => {
            productos.push({
                nombre: row.nombre,
                descripcion: row.descripcion,
                precio: parseFloat(row.precio), // Convierte el precio a número
                imagen_url: row.imagen_url,
                stock: parseInt(row.stock), // Convierte el stock a número entero
                categoria: row.categoria
            });
        })
        .on('end', () => {
            // Comienza la transacción para insertar los productos
            db.serialize(() => {
                // Opcional: Eliminar productos existentes (si quieres reemplazarlos)
                db.run("DELETE FROM productos");

                // Prepara la declaración SQL para insertar productos
                const sql = `INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria)
                             VALUES (?, ?, ?, ?, ?, ?)`;

                const stmt = db.prepare(sql);

                // Inserta cada producto
                productos.forEach(producto => {
                    const { nombre, descripcion, precio, imagen_url, stock, categoria } = producto;
                    stmt.run(nombre, descripcion, precio, imagen_url, stock, categoria);
                });

                stmt.finalize(); // Finaliza la declaración

                res.status(200).json({ message: 'Productos insertados correctamente' });
            });
        })
        .on('error', (err) => {
            console.error('Error al leer el archivo CSV:', err);
            res.status(500).json({ error: 'Error al leer el archivo CSV' });
        });
});

module.exports = router;
