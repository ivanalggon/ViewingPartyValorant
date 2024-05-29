const express = require('express');
const router = express.Router();
const db = require('../db');


// Ruta para obtener todos los productos
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;