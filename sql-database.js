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


async function getUser(id) {                  // This not working yet
    const [result] = await pool.query(`
        SELECT * FROM Users                           
        WHERE id = ?
    `, [id])
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
async function signUp(email, password_hash) {
    const newSignUp = await pool.query(`
        INSERT INTO authUsers (email,password_hash)
        VALUES (?,?)
    `, [email, password_hash]);
    // console.log("Signup succesful")
    return newSignUp
}



//Logins email & password
async function logIn(email, password) {
    const dbEmail = await pool.query(`
        SELECT email FROM authUsers 
        WHERE email = ?
    `, [email])
    if (!dbEmail || dbEmail[0].length === 0) {
        // console.log("Users doesnt exist")
        return null
    }

    const dbPassword = await pool.query(`
        SELECT password_hash FROM authUsers
        WHERE email = ?
    `, [email])
    if (!dbPassword || dbPassword.length === 0) {
        // console.log("Wrong Password")
        return null
    }

    const storedHash = dbPassword[0][0].password_hash
    // console.log(storedHash,dbPassword)

    const isMatch = await bcrypt.compare(password, storedHash)
    if (!isMatch) {
        // console.log("Wrong Password")
        return null
    }
    return dbPassword[0][0]
}

// Update Profile  (PUT request)
async function updateProfile(id, name, bio, regNumber) {
    const [target] = await pool.query(`
        SELECT id FROM authUsers WHERE id = ?`,
        [id])
    // console.log( "hi",target[0])
    if (target.length === 0) {
        throw new Error("User not found");
    }
    const authUserId = target[0].id;

    const [update] = await pool.query(`
        UPDATE Users SET name=?, bio=?, regNumber=? 
        WHERE auth_user_id=?
    `, [name, bio, regNumber, authUserId])
    // console.log(update)
    return update
}
//Search functionality (test)
async function searchUser(input) {
    const [user] = await pool.query(`
        SELECT * FROM Users 
        WHERE name LIKE ?
    `, [`%${input}%`]) //returns all column where input value matches name

    if (user.length === 0) return[]
    // console.log(user) 
    return user
}







export {
    pool, getUsers, getUser, signUp,
    deleteUser, logIn, updateProfile, searchUser
}

