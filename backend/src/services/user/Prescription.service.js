const Prescription = require("../../models/Prescription");

const createPrescriptionDB = async (data) => {
    return await Prescription.create(data);
};

const getPrescriptionByPatientDB = async (patientId) => {
    return await Prescription.find({ patientId })
        .populate({
            path: "doctorId",
            populate: {
                path: "userId",
                model: "User",
                select: "name email phone",
            },
        })
        .populate({
            path: "patientId",
            model: "User",
            select: "name email phone",
        })
        .sort({ createdAt: -1 });
};

module.exports = {
    createPrescriptionDB,
    getPrescriptionByPatientDB,
};