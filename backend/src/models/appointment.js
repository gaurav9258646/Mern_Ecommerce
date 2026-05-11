const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "completed", "cancelled"],
            default: "pending",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid"],
            default: "pending",
        },

        reason: {
            type: String,
            default: "",
        },

        notes: {
            type: String,
            default: "",
        },

        cancelReason: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;