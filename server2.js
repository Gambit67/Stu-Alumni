import express from 'express'
import bcrypt from 'bcrypt'
const app = express()
const port = 8080
app.use(express.json()); // Middleware for parsing json
import { pool, getUsers, getUser, signUp, deleteUser, logIn, updateProfile, searchUser } from './sql-database.js'

// GET all users (sql)
app.get("/sql", async (req, res) => {
    try {
        const allUsers = await getUsers()
        return res.status(200).send(allUsers);
    } catch (error) {
        return res.status(400).send(error)
    }
})

//Search for User
app.get('/sql/search', async (req, res) => {
    try {
        const { input } = req.query // Use params from url
        const result = await searchUser(input)
        return res.status(200).json({ found: result})
    } catch (error){
        return res.status(400).json({ message: error.message })
    }
})

// POST signUp new user (Working)
app.post("/sql", async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        const password_hash = await bcrypt.hash(password, 10)
        await signUp(email, password_hash)
        return res.status(200).json({ message: "Signup succesful" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});

// Login 
app.post('/sql/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "Email and password required" })
        }
        const user = await logIn(email, password)
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        return res.status(200).json({ message: "Login successful", email: user.email })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})





// DELETE a user by id (working)
app.delete('/sql', async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing 'id' in request body." });
        }
        const result = await deleteUser(id);
        if (!result) {
            return res.status(404).json({ message: "User not found or could not be deleted." });
        }
        return res.status(200).json({ id, message: "User deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})
//Update (PATCH) profile via dynamic route
app.patch("/sql/update/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { name, bio, regNumber } = req.body
        await updateProfile(id, name, bio, regNumber)
        return res.status(200).json({ message: "Profile Update successful" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//GET user by id (from url)
app.get("/sql/:uid", async (req, res) => {
    const id = req.params.uid
    const profile = await getUser(id)
    return res.status(200).json({ profile })
})


// connectServer()
async function connectServer() {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error(error)
    }
}
connectServer()




