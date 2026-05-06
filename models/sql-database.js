import mysql from 'mysql2';
import env from 'dotenv';
import bcrypt from 'bcrypt'
env.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise()

// GET all users
async function getUsers() {
    const [result] = await pool.query("SELECT * FROM Users")
    return result
}

async function getUser(id) {
    const [result] = await pool.query(`
        SELECT * FROM Users
        WHERE auth_user_id = ?
    `, [id])
    return result[0]
}

// Delete by id
async function deleteUser(id) {
    const [users] = await pool.query(`
        SELECT * FROM Users WHERE id = ?
    `, [id]);
    const deletedUser = users[0];
    if (!deletedUser) {
        return null;
    }
    await pool.query(`
        DELETE FROM Users WHERE id = ?
    `, [id]);
    return deletedUser;
}

//Signups with email & password
async function signUp(email, password_hash) {
    const newSignUp = await pool.query(`
        INSERT INTO authUsers (email,password_hash)
        VALUES (?,?)
    `, [email, password_hash]);
     console.log("Signup succesful")
    return newSignUp
}

//Logins email & password
async function logIn(email, password) {
    const [rows] = await pool.query(`
        SELECT password_hash,id,email FROM authUsers
        WHERE email = ?
    `, [email]);
    if (rows.length === 0) {
        return null
    }
    const user = rows[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
        return null
    }
    return user;
}

// Refresh Token Helpers
async function saveRefreshToken(id, token) {
    await pool.query(`
        UPDATE authUsers SET refresh_token = ?
        WHERE id = ?
    `, [token, id]);
}

async function findUserByRefreshToken(token) {
    const [rows] = await pool.query(`
        SELECT id, email FROM authUsers
        WHERE refresh_token = ?
    `, [token]);
    return rows[0];
}

// Update Profile
async function updateProfile(id, name, bio, regNumber) {
    // Use IFNULL to only update fields that are provided (not null)
    const [result] = await pool.query(`
        UPDATE Users 
        SET name = IFNULL(?, name), 
            bio = IFNULL(?, bio), 
            regNumber = IFNULL(?, regNumber)
        WHERE auth_user_id = ?
    `, [name || null, bio || null, regNumber || null, id]);

    if (result.affectedRows === 0) {
        throw new Error("Profile not found"); // Check if there was any change in database
    }
    return result;
}

//Search profile functionality
async function searchUser(name) {
    const [user] = await pool.query(`
        SELECT * FROM Users
        WHERE name LIKE ?
    `, [`%${name}%`])

    if (user.length === 0) return[]
    return user
}

export {
    pool, getUsers, getUser, signUp,
    deleteUser, logIn, updateProfile,
    searchUser, saveRefreshToken, findUserByRefreshToken
}
