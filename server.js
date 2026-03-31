const env = require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3000
const Profile = require("./DB Models/profile-DB")
const profileRoutes = require("./routes/profiles")
const Post = require("./DB Models/post-DB")
const postRoutes = require("./routes/posts")
const Auth = require("./DB Models/auth-DB")
const authRoutes = require("./routes/auth")
app.use(express.json()); // Middlewae for parsing json
app.use("/profiles", profileRoutes);
app.use("/posts", postRoutes)
app.use("auth", authRoutes)


// connectServer()

async function connectServer() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Mongo DB")

        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

connectServer()




