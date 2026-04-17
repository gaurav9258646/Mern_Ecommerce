const {
  registerUserDB,
  findUserByEmailDB,
  updateUserDB,
  getAllUsersDB,
  deleteUserDB
} = require("../../services/user/user.services");

const {
  generateToken,
  hashPassword,
  verifyPassword
} = require("../../utils");

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        error: "All fields required"
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await findUserByEmailDB(normalizedEmail);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists"
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await registerUserDB({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      role: "patient"
    });

    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({
      success: true,
      data: safeUser
    });

  } catch (error) {
    console.log("REGISTER ERROR 👉", error);
    return res.status(500).json({
      success: false,
      error: "Registration failed"
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase();

    const user = await findUserByEmailDB(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid password"
      });
    }

    const { accessToken, refreshToken } = generateToken({
      id: user._id,
      role: user.role
    });

    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      success: true,
      data: {
        user: safeUser,
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Login failed"
    });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Unauthorized"
      });
    }

    const user = await updateUserDB(id, req.body);

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Update failed"
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersDB();

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch users"
    });
  }
};


// Delete
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Only admin can delete"
      });
    }

    await deleteUserDB(id);

    return res.status(200).json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Delete failed"
    });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers
};