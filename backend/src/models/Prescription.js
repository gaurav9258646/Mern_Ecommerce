const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
    {
        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },

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

        medicines: [
            {
                name: {
                    type: String,
                    required: true,
                },

                dosage: {
                    type: String,
                    required: true,
                },

                timing: {
                    type: String,
                    required: true,
                },
            },
        ],

        notes: {
            type: String,
            default: "",
        },

        nextVisitDate: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
