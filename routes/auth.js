import express from "express";
import bcrypt from 'bcrypt'
import Auth from "../DB Models/auth-DB.js";
const router = express.Router();
// Post new account (Create)
router.post("/", async (req,res)=> {
    try{
        const {email,password} = req.body;
        const hash = await bcrypt.hash(password,10);
        const newAuth = new Auth ({email,password:hash});
        await newAuth.save();
        res.status(201).json(newAuth);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

// Login account (Authenticate)
router.post("/login", async (req,res)=> {
    try{
        const {email,password} = req.body;
        const auth = await Auth.findOne({email});
        if (!auth) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,auth.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        res.status(200).json({message: "Login successful"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
export default router;