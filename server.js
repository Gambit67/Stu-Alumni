import env from "dotenv"
env.config()
import express from 'express'
const app = express()
import mongoose from 'mongoose'

const port = 3000
import profileRoutes from "./routes/profiles.js"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
app.use(express.json()); // Middleware for parsing json
app.use("/profiles", profileRoutes);
app.use("/posts", postRoutes)
app.use("/auth", authRoutes)


// connectServer()

async function connectServer() {
    try {
        await mongoose.connect(process.env.MONGO_URL) //Connect to mongoDB
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




