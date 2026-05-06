import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUp, logIn, saveRefreshToken, findUserByRefreshToken } from "../models/sql-database.js";


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
    //Implement Jwt using the user (safe) objects
    const accessToken = jwt.sign({ id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({ id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" }
    );

    // Save refresh token to database
    await saveRefreshToken(user.id, refreshToken);

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken
    });
  } catch (error) {
    return res.status(500).json({ message: error.message }); //General error
  }
}

async function tokenRefresh(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

  try {
    // 1. Check if token exists in DB
    const user = await findUserByRefreshToken(refreshToken);
    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    // 2. Verify JWT
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token expired or invalid" });

      // 3. Issue new Access Token
      const accessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function authLogout(req, res) {
  const { refreshToken } = req.body;
  try {
    const user = await findUserByRefreshToken(refreshToken);
    if (user) {
      await saveRefreshToken(user.id, null); // Clear token from DB
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export { authLogin, authSignup, tokenRefresh, authLogout };
