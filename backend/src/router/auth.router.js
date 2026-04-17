const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers  
} = require("./../controllers/user/auth.controllers");

const authMiddleware = require("./../Middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);

router.get("/users", authMiddleware, getAllUsers);

module.exports = router;