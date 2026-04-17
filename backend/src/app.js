const express = require("express");
const cors = require("cors");
const authRoutes = require("./router/auth.router");
const appointmentRoutes = require("./router/appointment.router")
const doctorRoutes = require("./router/doctor.router")



const app = express();
app.use(cors());

app.use(express.json());

app.use("/auth/", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/appointments", appointmentRoutes);

module.exports = app;