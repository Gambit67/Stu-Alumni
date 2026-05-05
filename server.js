import env from "dotenv";
import express from "express";
import mongoose from "mongoose";
env.config();
const app = express();
const port = process.env.SERVER_PORT;

// const port = 3000;
// import profileRoutes from "./routes/profiles.js";
// import postRoutes from "./routes/posts.js";
// import authRoutes from "./routes/auth.js";
// app.use(express.json()); // Middleware for parsing json
// app.use("/profiles", profileRoutes);
// app.use("/posts", postRoutes);
// app.use("/auth", authRoutes);

app.get("/home", async (req, res) => {
  const time = new Date();
  const currentTime = time.toLocaleTimeString();
  console.log(req.body)
  res.json({Time: currentTime})
  
});

// connectServer()

async function connectServer() {
  try {
    // await mongoose.connect(process.env.MONGO_URL) //Connect to mongoDB
    // console.log("Connected to Mongo DB")

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

connectServer();
