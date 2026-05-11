const Doctor = require("../../models/doctor");

// CREATE
const createDoctorDB = async (data) => {
    return await Doctor.create(data);
};

// GET ALL
const getAllDoctorsDB = async () => {
  return await Doctor.find().populate("userId");
};
// GET ONE
const getDoctorByIdDB = async (id) => {
    return await Doctor.findById(id).populate("userId");
};

// UPDATE
const updateDoctorDB = async (id, data) => {
    return await Doctor.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
const deleteDoctorDB = async (id) => {
    return await Doctor.findByIdAndDelete(id);
};

module.exports = {
    createDoctorDB,
    getAllDoctorsDB,
    getDoctorByIdDB,
    updateDoctorDB,
    deleteDoctorDB
};