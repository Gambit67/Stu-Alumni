import mysql from 'mysql2';
import env from 'dotenv';
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

async function getUser(id) {                  // This not working yet
    const [result] = await pool.query(`
        SELECT *                            
        FROM Users                                
        WHERE id = ?
    `,[id])
    return result[0]
}

// Delete by id  (Not working)
async function deleteUser(id) {
    // First, fetch the user to return after deletion
    const [users] = await pool.query(`
        SELECT * FROM Users WHERE id = ?
    `, [id]);
    const deletedUser = users[0];
    if (!deletedUser) {
        return null; // No user to delete
    }
    // Then, delete the user
    const [result] = await pool.query(`
        DELETE FROM Users WHERE id = ?
    `, [id]);
    console.log("Deleted user:", deletedUser);
    return deletedUser; // Return deleted profile as JSON
}

//Signups with email & password
async function signUp (email,password_hash) {
    const newSignUp = await pool.query (`
        INSERT INTO authUsers (email,password_hash)
        VALUES (?,?)
    `, [email,password_hash]);
    console.log("Signup succesful")
    return newSignUp
}

signUp ("grace@gmail.com","6482778dhedhe8d9")

export { pool, getUsers, getUser, signUp, deleteUser }
