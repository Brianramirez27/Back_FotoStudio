import pool from '../config/conection_db.js';
import bcrypt from 'bcrypt';
import cryto from 'node:crypto';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();


const getUser = async () => {
    try {
        const res = await pool.query('SELECT * FROM public.user');
        return { users: res.rows };
    } catch (error) {
        throw new Error(error.message);
    }
};


const authenticateUser = async (email, password) => {
    try {
        // Ejecutar la consulta
        const query = await pool.query('SELECT * FROM public.user WHERE user_email = $1', [email]);

        if (query.rows.length === 0) {
            throw new Error('usuario no encontradoo email incorrecto');
        };

        // Si se encuentra el usuario
        const user = query.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.user_password);

        if (!passwordMatch) {
            throw new Error('contraseña incorrecta');
        }

        const SECRET_KEY  =   process.env.SECRET_KEY;

        const token = jwt.sign({
            user_id: user.user_id,
            user_name: user.user_name,
            user_first_name: user.user_first_name,
            user_email: user.user_email,
            fk_rol_user_user: user.fk_rol_user_user
        }, "secret", { expiresIn: '8h' });

        return {token: token, user: user};

    } catch (error) {
        throw new Error(error.message);
    }
};



const registerUser = async (email, password, name, firstName,) => {

    try {
        const hash = await bcrypt.hash(password, 10)
        const user_id = crypto.randomUUID();
        const res = await pool.query('INSERT INTO public.user (user_id,user_name,user_first_name,user_email,user_password,fk_rol_user_user,created_at) VALUES ($1, $2, $3, $4, $5, $6,$7)', [user_id, name, firstName, email, hash, 1, new Date()]);

        if (res.rowCount === 1) {

            const userRegister = {
                user_id: user_id,
                user_name: name,
                password: hash,
                user_first_name: firstName,
                user_email: email,
                fk_rol_user_user: 1,
                created_at: new Date()
            }
            return { success: true, user: userRegister };

        }

    }
    catch (error) {
        return { error: error.message };
    }



}


export { authenticateUser, registerUser, getUser};