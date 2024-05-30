const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Verifica que la carpeta 'uploads' existe
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath); // Crea la carpeta si no existe
}

// Configuración de multer para almacenar las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta para guardar las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
  },
});

const upload = multer({ storage });
// Aquí es donde debes colocar la línea para servir la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vpv',
  port: 3306
});

// Middleware para el análisis del cuerpo de solicitudes en formato JSON
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5501', 'http://127.0.0.1:5501'], 
  methods: 'GET,PUT,POST,DELETE', 
  optionsSuccessStatus: 200 
}));

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json({ users: results });
    }
  });
});

// Ruta para obtener un usuario por su ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM user WHERE id_user = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.json({ user: results[0] });
      }
    }
  });
});

// Ruta para crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const { name, surname, username, email, password } = req.body;
  console.log('Nuevo usuario recibido:', req.body); // Para depurar

  if (!name || !surname || !username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Por ejemplo, supongamos que el usuario administrador tiene el nombre de usuario 'admin'
  const role = (username === 'admin') ? 'admin' : 'user';

  db.query(
    'INSERT INTO user (name, surname, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
    [name, surname, username, email, password, role],
    (err, results) => {
      if (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).json({ error: 'Error al crear el usuario', details: err.message });
      } else {
        res.status(201).json({ message: 'Usuario creado con éxito', userId: results.insertId });
      }
    }
  );
});


// Ruta para actualizar un usuario por su ID
app.put('/api/users/:id', (req, res) => {
  const { name, surname, username, email, password, role } = req.body;
  const userId = req.params.id;

  // Verifica si alguno de los campos obligatorios está ausente
  if (!name || !surname || !username || !email || !password || !role) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Construye la consulta SQL para actualizar el usuario
  const query = 'UPDATE user SET name = ?, surname = ?, username = ?, email = ?, password = ?, role = ? WHERE id_user = ?';
  const values = [name, surname, username, email, password, role, userId];

  // Ejecuta la consulta de actualización en la base de datos
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.json({ message: 'Usuario actualizado con éxito', user: req.body });
      }
    }
  });
});


// Ruta para eliminar un usuario por su ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM user WHERE id_user = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    } else {
      res.json({ message: 'Usuario eliminado con éxito' });
    }
  });
});

// Ruta para obtener todos los productos
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM product', (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
    } else {
      res.json({ products: results });
    }
  });
});

// Ruta para obtener un producto por su ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM product WHERE id_product = ?', [productId], (err, results) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      res.status(500).json({ error: 'Error al obtener el producto' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Producto no encontrado' });
      } else {
        res.json({ product: results[0] });
      }
    }
  });
});

// Ruta para crear un nuevo producto
app.post('/api/products', (req, res) => {
  const { name, description, stock, price, img } = req.body;
  console.log('Nuevo producto recibido:', req.body); // Para depurar

  if (!name || !description || !stock || !price || !img) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const imgData = Buffer.from(img, 'base64'); // Convertir de base64 a Buffer

  db.query(
    'INSERT INTO product (name, description, stock, price, img) VALUES (?, ?, ?, ?, ?)',
    [name, description, stock, price, imgData],
    (err, results) => {
      if (err) {
        console.error('Error al crear el producto:', err);
        res.status(500).json({ error: 'Error al crear el producto', details: err.message });
      } else {
        res.status(201).json({ message: 'Producto creado con éxito', productId: results.insertId });
      }
    }
  );
});

// Ruta para actualizar un producto por su ID
app.put('/api/products/:id', (req, res) => {
  const { name, description, stock, price, img } = req.body;
  const productId = req.params.id;

  const imgData = Buffer.from(img, 'base64'); // Convertir de base64 a Buffer

  db.query(
    'UPDATE product SET name = ?, description = ?, stock = ?, price = ?, img = ? WHERE id_product = ?',
    [name, description, stock, price, imgData, productId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar el producto:', err);
        res.status(500).json({ error: 'Error al actualizar el producto' });
      } else {
        res.json({ message: 'Producto actualizado con éxito', product: req.body });
      }
    }
  );
});

// Ruta para eliminar un producto por su ID
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  db.query('DELETE FROM product WHERE id_product = ?', [productId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    } else {
      res.json({ message: 'Producto eliminado con éxito' });
    }
  });
});

// Ruta para obtener todos los eventos
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM event', (err, results) => {
    if (err) {
      console.error('Error al obtener eventos:', err);
      res.status(500).json({ error: 'Error al obtener eventos' });
    } else {
      res.json({ events: results });
    }
  });
});

// Ruta para obtener un evento por su ID
app.get('/api/events/:id', (req, res) => {
  const eventId = req.params.id;
  db.query('SELECT * FROM event WHERE id_event = ?', [eventId], (err, results) => {
    if (err) {
      console.error('Error al obtener el evento:', err);
      res.status(500).json({ error: 'Error al obtener el evento' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Evento no encontrado' });
      } else {
        res.json({ event: results[0] });
      }
    }
  });
});

// Ruta para crear un nuevo evento
app.use('/uploads', express.static('uploads')); // Servir la carpeta 'uploads'

// Ruta para crear un nuevo evento con una imagen
app.post('/api/events', upload.single('img'), (req, res) => {
  const { name, description, stock, location, price, date, hour } = req.body;
  const imgPath = req.file.path; // Ruta de la imagen cargada

  db.query(
    'INSERT INTO event (name, description, stock, location, price, date, hour, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, description, stock, location, price, date, hour, imgPath],
    (err, results) => {
      if (err) {
        console.error('Error al crear el evento:', err);
        res.status(500).json({ error: 'Error al crear el evento', details: err.message });
      } else {
        res.status(201).json({ message: 'Evento creado con éxito', eventId: results.insertId });
      }
    }
  );
});

// Ruta para actualizar un evento por su ID con una imagen nueva
app.put('/api/events/:id', upload.single('img'), (req, res) => {
  const { name, description, stock, location, price, date, hour } = req.body;
  const eventId = req.params.id;
  const imgPath = req.file ? req.file.path : null; // Ruta de la nueva imagen, si existe

  const query = imgPath
    ? 'UPDATE event SET name = ?, description = ?, stock = ?, location = ?, price = ?, date, hour, img = ? WHERE id_event = ?'
    : 'UPDATE event SET name = ?, description = ?, stock = ?, location = ?, price, date, hour WHERE id_event = ?';

  const queryParams = imgPath
    ? [name, description, stock, location, price, date, hour, imgPath, eventId]
    : [name, description, stock, location, price, date, hour, eventId];

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error al actualizar el evento:', err);
      res.status(500).json({ error: 'Error al actualizar el evento', details: err.message });
    } else {
      res.json({ message: 'Evento actualizado con éxito', event: req.body });
    }
  });
});

// Ruta para obtener eventos y mostrar la imagen
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM event', (err, results) => {
    if (err) {
      console.error('Error al obtener eventos:', err);
      res.status(500).json({ error: 'Error al obtener eventos' });
    } else {
      res.json({ events: results });
    }
  });
});

// Ruta para eliminar un evento por su ID
app.delete('/api/events/:id', (req, res) => {
  const eventId = req.params.id;
  db.query('DELETE FROM event WHERE id_event = ?', [eventId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el evento:', err);
      res.status(500).json({ error: 'Error al eliminar el evento' });
    } else {
      res.json({ message: 'Evento eliminado con éxito' });
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});