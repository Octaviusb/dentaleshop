const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const jwt = require('jsonwebtoken');
const mime = require('mime');

const app = express();
const secretKey = 'tu_secreto';
const dataPath = path.join(__dirname, 'data', 'productos.csv');

// Configuración de MIME Types
express.static.mime.define({ 'text/css': ['css'] });
express.static.mime.define({ 'application/javascript': ['js'] });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static('data'));

// Middleware para registrar solicitudes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

// Autenticación de usuarios
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'usuarioCorrecto' && password === 'contraseñaCorrecta') {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Autenticación fallida' });
    }
});

app.post('/registro', (req, res) => {
    const { username, password, email } = req.body;
    // Simulación de registro (aquí deberías guardar los datos en tu base de datos)
    const token = jwt.sign({ username, email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/perfil', verifyToken, (req, res) => {
    res.json({ username: req.user.username, profile: 'Datos del perfil' });
});

// Manejo de productos
app.get('/api/productos', (req, res) => {
    const productos = [];
    fs.createReadStream(dataPath)
        .pipe(csv())
        .on('data', (data) => {
            if (data.nombre && data.precio && data.imagen) {
                productos.push(data);
            }
        })
        .on('end', () => {
            if (productos.length === 0) {
                return res.status(404).json({ message: 'No hay productos disponibles' });
            }
            res.json(productos);
        })
        .on('error', (error) => {
            console.error('Error al leer el archivo CSV:', error);
            res.status(500).send('Error al procesar los datos de productos');
        });
});

// Rutas para páginas
const pages = ['index', 'login', 'registro', 'cart', 'checkout', 'admin', 'shop'];
pages.forEach((page) => {
    app.get(`/${page === 'index' ? '' : page}`, (req, res) => {
        res.sendFile(path.join(__dirname, `public/views/${page}.html`));
    });
});

// Manejo de autenticación en login
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } else {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
