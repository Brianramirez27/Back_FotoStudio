
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost', // Si programas desde fuera de Docker, usa localhost
    database: process.env.DB_NAME || 'FotoStudio',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432
});

// 1. Escuchar errores en clientes inactivos (muy importante para que no se caiga la app)
pool.on('error', (err) => {
    console.error('❌ Error inesperado en el pool de Postgres:', err);
    process.exit(-1);
});

// 2. Función para probar la conexión apenas arranque la app
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ ¡Conexión exitosa a PostgreSQL!');
        console.log(`📡 Host: ${process.env.DB_HOST || 'localhost'} | DB: ${process.env.DB_NAME || 'FotoStudio'}`);
        client.release(); // Importante: liberar el cliente de vuelta al pool
    } catch (err) {
        console.error('❌ Error conectando a la base de datos:');
        console.error({
            message: err.message,
            stack: err.stack,
            code: err.code // Esto te dirá si es "ECONNREFUSED", "invalid_password", etc.
        });
    }
};

testConnection();

export default pool;
