const express = require("express");
const cors = require("cors");
const authRoutes = require("./router/Auth.routes");
const appointmentRoutes = require("./router/Appointment.routes");
const doctorRoutes = require("./router/Doctor.route");
const prescriptionRoutes = require("./router/Prescription.routes")
const GalleryRouter = require("./router/Gallery.routes")



const app = express();
app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/gallery", GalleryRouter)

module.exports = app;