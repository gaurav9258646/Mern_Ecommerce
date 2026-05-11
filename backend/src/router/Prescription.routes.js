const express = require("express");
const router = express.Router();

const {
    createPrescription,
    getPatientPrescriptions,
} = require("../controllers/user/Prescription.controller");

const authMiddleware = require("../Middleware/authMiddleware");

router.post(
    "/",
    authMiddleware,
    createPrescription
);

router.get(
    "/:patientId",
    authMiddleware,
    getPatientPrescriptions
);

module.exports = router;
