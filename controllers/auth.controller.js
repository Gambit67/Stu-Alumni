import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUp, logIn } from "../models/sql-database.js";


// Authenticate JWT
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  console.log(authHeader, req.headers)
  if (!token) return res.status(401).json({ message: "No token" });
  try{
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({message:err.message})
  }
}




async function authSignup(req, res) {
  const { email, password } = req.body; //Gets value from request
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." }); // Check empty values from request
    }
    const password_hash = await bcrypt.hash(password, 10);
    await signUp(email, password_hash); //
    return res.status(200).json({ message: "Signup succesful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}


async function authLogin(req, res) {
  const { email, password } = req.body; //Get values from the request object
  try {
    if (!email || !password) {
      return res.status(401).json({ message: "Email and password required" }); //Check the values from request
    }
    const user = await logIn(email, password); // Perform database action
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" }); //Checks database for user
    }
    //Implement Jwt using the user object
    const accessToken = jwt.sign({ id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET, { expiresIn: '0.25h' }
    ); // Expires in (use only numbers for seconds(for testing))
    return res.status(200).json({
      message: "Login successful", //Returns jwt to the client
      accessToken: accessToken,
      // email:user.email,
      // id:user.id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message }); //General error
  }
}




export { authLogin, authSignup };
