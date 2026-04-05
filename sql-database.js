import mysql from 'mysql2';
import env from 'dotenv';
env.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise()

async function getUsers() {
    const [result] = await pool.query("SELECT * FROM Users;")
    return result
}

async function getUser(id) {
    const [result] = await pool.query(`
        SELECT *
        FROM Users
        WHERE id = ?
    `,[id])
    return result[0]
}

async function createUser(name, email, regNumber) {
    const [result] = await pool.query(`
        INSERT INTO Users (name, email, regNumber)
        VALUES (?,?,?)

    `,[name, email, regNumber])
    return result.insertId
}

export { pool, getUsers, getUser, createUser }
