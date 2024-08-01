import pool from '../config/conection_db.js';
const getUser = async () => {
    try {
      // Ejecutar la consulta
      const res = await pool.query('SELECT * FROM user');
  
      // Comprobar si hay resultados
      if (res.rows.length === 0) {
        return { error: 'User not found' };
      }
      
      // Devolver los resultados si se encuentran usuarios
      return {
        message: 'User found',
        user: res.rows
      };
    } catch (error) {
      // Manejo de errores
      console.error('Error executing query', error);
      return { error: error.message };
    }
  };
  

export { getUser };