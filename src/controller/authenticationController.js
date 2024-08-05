import * as userService from '../services/authenticationService.js';


async function authenticateUser(req, res) {
  try {

    const { email, password } = req.body

    // validaciones de datos se pueden sacar con zod o express validator
    if (typeof email !== 'string') {
      return res.status(400).send("Error: The email must be a string");
    }
    if (!email.trim()) {
      return res.status(400).send("Error: The email must not be empty");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Error: The email format is invalid");
    }
    if (typeof password !== 'string') {
      return res.status(400).send("Error: The password must be a string");
    }
    if (!password.trim()) {
      return res.status(400).send("Error: The password must not be empty");
    }
    if (password.length < 6) {
      return res.status(400).send("Error: The password must be at least 6 characters long");
    }


    const result = await userService.authenticateUser(email, password);

    if (result.error) {
      return res.status(400).send(result.error); // Manejar errores de usuario
    }

    return res.status(200).send(result);

  }
  catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function registerUser(req, res) {
  try {
    const { email, password, name, firstName } = req.body;
    // validaciones de datos se pueden sacar con zod o express validator
    if (typeof email !== 'string') {
      return res.status(400).send("Error: The email must be a string");
    }
    if (!email.trim()) {
      return res.status(400).send("Error: The email must not be empty");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Error: The email format is invalid");
    }
    if (typeof password !== 'string') {
      return res.status(400).send("Error: The password must be a string");
    }
    if (!password.trim()) {
      return res.status(400).send("Error: The password must not be empty");
    }
    if (password.length < 6) {
      return res.status(400).send("Error: The password must be at least 6 characters long");
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