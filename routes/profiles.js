import express from 'express'

import Profile from "../DB Models/profile-DB.js"
const router = express.Router()
import { getUsers, getUser, createUser, deleteUser} from '../sql-database.js'
router.use(express.json())

// POST new profile(Create account)
router.post("/", async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.status(201).send(newProfile);
    } catch (error) {
        res.status(400).send(error)
    }
});

// GET all profiles
router.get("/", async (req, res) => {
    try {
        const allProfiles = await Profile.find({});
        res.status(200).json(allProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

router.post("/sql", async (req, res) => {
    try {
        const {name, email, regNumber} = req.body
        const newUser = await createUser(name, email, regNumber);
        return res.status(200).send(newUser)
    } catch (error) {
        return res.status(400).send(error)
    }
});

// DELETE profile by id (sql)
router.delete('/sql', async (req,res)=>{
    try{
        const {id} = req.body;
        const targetUser = await deleteUser(id)
        return res.status(200).send(id)
    } catch (error) {
        return res.status(400).send(error)
    }
    
})

// GET profile by Id
router.get("/:id", async (req, res) => {
    // Get id from url using req.params.id
    try {
        const student = await Profile.findById(req.params.id);
        if (!student) {
            return res.status(404).send("Student not found");
        }
        console.log(student)
        res.status(200).json(student);
    } catch (error) {
        res.status(500).send(error);
    }
})



export default router;