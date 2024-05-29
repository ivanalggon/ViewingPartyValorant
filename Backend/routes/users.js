const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
  const { name, surname, username, email, password } = req.body;

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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;