import {
  getUsers,
  getUser,
  deleteUser,
  updateProfile,
  searchUser,
} from "../models/sql-database.js";

async function getUserProfile(req, res) {
  try {
    const { name } = req.query;
    const result = await searchUser(name);
    return res.status(200).json({ found: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// GET all users
async function getUserProfiles(req, res) {
  try {
    const allUsers = await getUsers();
    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(400).send(error);
  }
}

// GET single user by ID
async function getSingleProfile(req, res) {
  try {
    const id = req.params.uid;
    const profile = await getUser(id);
    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// DELETE a user
async function deleteUserProfile(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Missing 'id' in request body." });
    }
    const result = await deleteUser(id);
    if (!result) {
      return res
        .status(404)
        .json({ message: "User not found or could not be deleted." });
    }
    return res.status(200).json({ id, message: "User deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// UPDATE (PATCH/PUT) profile
async function updateProfileData(req, res) {
  try {
    const id = req.params.id;
    const { name, bio, regNumber } = req.body;
    await updateProfile(id, name, bio, regNumber);
    return res.status(200).json({ message: "Profile Update successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  getUserProfiles,
  getUserProfile,
  getSingleProfile,
  deleteUserProfile,
  updateProfileData,
};
