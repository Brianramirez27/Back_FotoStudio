import * as userService from '../services/authenticationService.js';

async function authenticateUser(req, res) {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string') {
      return res.status(400).json({ error: 'El email debe ser una cadena de texto.' });
    }
    if (!email.trim()) {
      return res.status(400).json({ error: 'El email no puede estar vacío.' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'El formato del email es inválido.' });
    }
    if (typeof password !== 'string') {
      return res.status(400).json({ error: 'La contraseña debe ser una cadena de texto.' });
    }
    if (!password.trim()) {
      return res.status(400).json({ error: 'La contraseña no puede estar vacía.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }


    
    // Autenticación del usuario
    const result = await userService.authenticateUser(email, password);
    return res.status(200).json(result);

  } catch (error) {
    return res.status(400).json({ error: error.message }); // Usa 500 para errores del servidor
  }
}




async function registerUser(req, res) {

  try {
    const { email, password, name, firstName } = req.body;
    // validaciones de datos se pueden sacar con zod o express validator
    if (typeof email !== 'string') {
      return res.status(400).json({ error: 'El email debe ser una cadena de texto.' });
    }
    if (!email.trim()) {
      return res.status(400).json({ error: 'El email no puede estar vacío.' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'El formato del email es inválido.' });
    }
    if (typeof password !== 'string') {
      return res.status(400).json({ error: 'La contraseña debe ser una cadena de texto.' });
    }
    if (!password.trim()) {
      return res.status(400).json({ error: 'La contraseña no puede estar vacía.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }


    const result = await userService.registerUser(email, password, name, firstName);
    console.log(result);
    return res.status(200).send(result);
  }
  catch (error) {

    console.error('Error during registration:', error);
    return res.status(500).send(result.error);

  }
}


export {
  authenticateUser,
  registerUser
};