const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Verifica que la carpeta 'uploads' existe
const uploadPath = path.join(__dirname, '..', 'uploads');
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

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;