const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor
} = require("../controllers/admin/doctorController");

router.post("/", authMiddleware, authorize("admin"), createDoctor);

router.get("/", getAllDoctors);

router.get("/:id", getDoctor);

router.put("/:id", authMiddleware, authorize("admin"), updateDoctor);

router.delete("/:id", authMiddleware, authorize("admin"), deleteDoctor);

module.exports = router;