const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5501', 'http://127.0.0.1:5501'],
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
