const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
  getPatientAppointments,
  updatePaymentStatus,

} = require("../controllers/user/Appointment.Controller");

const authorize = require("../Middleware/roleMiddleware");
const authenticate = require("../Middleware/authMiddleware");
const { updatePaymentStatusDB } = require("../services/user/Appointment.service");

router.post(
  "/",
  authenticate,
  authorize("patient"),
  createAppointment
);

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getAllAppointments
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "doctor"),
  getAppointment
);

router.put(
  "/:id",
  authenticate,
  authorize("doctor", "admin"),
  updateAppointment
);

router.put(
  "/cancel/:id",
  authenticate,
  authorize("patient", "admin"),
  cancelAppointment
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteAppointment
);
router.get(
  "/patient/:patientId",
  authenticate,
  authorize("patient"),
  getPatientAppointments
);
router.put(
  "/payment/:id",
  authenticate,
  authorize("patient", "admin"),
  updatePaymentStatus
);

module.exports = router;