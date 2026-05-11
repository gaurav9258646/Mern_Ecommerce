const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers  ,
  getProfile
} = require("../controllers/user/Auth.controller");

const authMiddleware = require("../Middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);

router.get("/users", authMiddleware, getAllUsers);
router.get("/me", authMiddleware, getProfile);


module.exports = router;