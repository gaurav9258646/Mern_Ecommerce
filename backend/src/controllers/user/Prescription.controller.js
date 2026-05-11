const {
    createPrescriptionDB,
    getPrescriptionByPatientDB,
} = require("../../services/user/Prescription.service");

const createPrescription = async (req, res) => {
    try {
        const {appointmentId,patientId, doctorId,medicines,notes,nextVisitDate,
        } = req.body;

        if ( !appointmentId ||!patientId || !doctorId ||!medicines ||medicines.length=== 0
        ) {
            return res.status(400).json({
                success: false,
                error: "Required fields missing",
            });
        }

        const prescription = await createPrescriptionDB({
            appointmentId,
            patientId,
            doctorId,
            medicines,
            notes,
            nextVisitDate,
        });

        return res.status(201).json({
            success: true,
            data: prescription,
        });
    } catch (error) {
        console.log("CREATE PRESCRIPTION ERROR:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to create prescription",
        });
    }
};

const getPatientPrescriptions = async (req, res) => {
    try {
        const { patientId } = req.params;

        const prescriptions = await getPrescriptionByPatientDB(patientId);

        return res.status(200).json({
            success: true,
            data: prescriptions,
        });
    } catch (error) {
        console.log("GET PRESCRIPTION ERROR:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch prescriptions",
        });
    }
};

module.exports = {
    createPrescription,
    getPatientPrescriptions,
};
