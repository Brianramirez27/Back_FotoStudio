import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

function validateToken(req, res, next) {
    // Obtén el token del header Authorization
    const token = req.headers.authorization?.split(' ')[1]; // 'Bearer TOKEN'
  
    if (!token) {
      return res.status(401).json({ status: 'FAILED', message: 'Token no proporcionado' });
    }
  
    try {
      // Decodifica y verifica el token
      const decodedToken = jwt.verify(token, 'tuClaveSecreta'); // Usa tu clave secreta aquí
  
      // El token es válido; puedes añadir el token decodificado al objeto de solicitud
      req.user = decodedToken; // Puedes agregar información adicional si es necesario
      next(); // Llama al siguiente middleware o ruta
    } catch (error) {
      // El token es inválido o ha expirado
      return res.status(401).json({ status: 'FAILED', message: 'Token no válido o expirado' });
    }
  }

export { validateToken };