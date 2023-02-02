import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306,
}).promise();

export async function createUser({email, password, displayName}) {
    const [results] = await pool.query(
        `INSERT INTO users (email, password, displayName) VALUES (?, ?, ?)`,
        [email, password, displayName]
    );
    const id = results.insertId;
    return await getUserById(id);
}

export async function getUserById(id) {
    const [results] = await pool.query(
        `SELECT * FROM users WHERE id = ?`,
        [id]
    );
    return results[0];
}

export async function getUserByEmail(email) {
    const [results] = await pool.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    );
    return results[0];
}

export async function updatedUserDisplayName(id, displayName) {
    const [results] = await pool.query(
        `UPDATE users SET displayName = ? WHERE id = ?`,
        [displayName, id]
    );
    return results;
}

export async function updatedUserProfileImage(id, profileImage) {
    const [results] = await pool.query(
        `UPDATE users SET profileImage = ? WHERE id = ?`,
        [profileImage, id]
    );
    return ;
}