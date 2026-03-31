const express = require("express")
const Profile = require("../DB Models/profile-DB")
const router = express.Router()

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

// GET all profile by registration Number
router.get("/", async (req,res) => {
    
})

module.exports = router;