const {
    createDoctorDB,
    getAllDoctorsDB,
    getDoctorByIdDB,
    updateDoctorDB,
    deleteDoctorDB
} = require("../../services/admin/doctor.service");

const User = require("../../models/user");
const bcrypt = require("bcrypt");

const createDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            specialization,
            department,
            experience,
            fees
        } = req.body;
        const imageUrl = req.file ? req.file.path : "";


        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "All feilds are required"
            });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                error: "Email already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: "doctor"
        });

        const doctor = await createDoctorDB({
            userId: user._id,
            specialization,
            department,
            experience,
            fees,
            profileImage: imageUrl 
        });

        return res.status(201).json({
            success: true,
            message: "Doctor created",
            data: doctor
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await getAllDoctorsDB();

        return res.status(200).json({
            success: true,
            data: doctors
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Failed to fetch doctors"
        });
    }
};

const getDoctor = async (req, res) => {
    try {
        const doctor = await getDoctorByIdDB(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                error: "Doctor not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: doctor
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error fetching doctor"
        });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const doctor = await updateDoctorDB(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            data: doctor
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Update failed"
        });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        await deleteDoctorDB(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Doctor deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Delete failed"
        });
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor
};