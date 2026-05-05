import env from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profiles.route.js";
import { authenticateToken } from "./controllers/auth.controller.js";

env.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json()); // Middleware for parsing json
app.use(express.static("public")); // Serve static files from the 'public' directory

// Mount Routes
app.use("/sql", authRoutes);
app.use("/sql", profileRoutes);

app.get('/protect', authenticateToken,  (req, res) => {
  const loggedinUser = req.user.id
  const email = req.user.email
  console.log(`welcome ${email}`)
  res.send("protected route sucessful")
})

// connectServer()
async function connectServer() {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
connectServer();
