import express from 'express'
import bcrypt from 'bcrypt'
const app = express()
const port = 3000
app.use(express.json()); // Middleware for parsing json
import { pool, getUsers, getUser, signUp, deleteUser} from './sql-database.js'

// GET all users (sql)
app.get("/sql", async (req,res) => {
    try{
        const allUsers = await getUsers()
        return res.status(200).send(allUsers);
    } catch (error) {
        return res.status(400).send(error)
    }
})

app.post("/sql", async (req, res) => {
    try {
        const {email,password} = req.body;
        const password_hash = await bcrypt.hash(password,10)
        const hash_info = {email,password_hash} 
        const newUser = await signUp(hash_info)
        return res.status(200).json({message: "Signup succesful"})
    } catch (error) {
        return res.status(500).send(error)
    }
});
        
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
});

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




