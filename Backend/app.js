const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

// Middleware para el análisis del cuerpo de solicitudes en formato JSON
app.use(express.json());

// Rutas
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const eventsRouter = require('./routes/events');
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/events', eventsRouter);

// Inicia el servidor
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
