const express = require('express');
const router = express.Router();
const db = require('../db');
const upload = require('../middlewares/upload');

// Ruta para obtener todos los eventos
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.use('/uploads', express.static('uploads')); // Servir la carpeta 'uploads'

// Ruta para crear un nuevo evento con una imagen
router.post('/', upload.single('img'), (req, res) => {
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
router.put('/:id', upload.single('img'), (req, res) => {
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
router.get('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;