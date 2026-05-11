const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/admin/doctor.Controller");
const upload = require("../Middleware/upload");


router.post("/", authMiddleware, authorize("admin"), upload.single("image"), createDoctor);

router.get("/", getAllDoctors);

router.get("/:id", getDoctor);

router.put("/:id", authMiddleware, authorize("admin"), updateDoctor);

router.delete("/:id", authMiddleware, authorize("admin"), deleteDoctor);

module.exports = router;