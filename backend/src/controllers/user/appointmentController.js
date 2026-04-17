const { createAppointmentDB,
  getAppointmentByIdDB,
  getAppointmentsByPatientDB,
  getAppointmentsByDoctorDB,
  updateAppointmentDB,
  deleteAppointmentDB,
  getAllAppointmentsDB,
  isSlotAvailable} = require("../../services/user/appointmentServices");
const  createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !date || !time) {
      return res.status(400).json({
        success: false,
        error: "doctorId, date and time are required"
      });
    }

    const available = await isSlotAvailable(doctorId, date, time);

    if (!available) {
      return res.status(400).json({
        success: false,
        error: "Slot already booked"
      });
    }

    const appointment = await createAppointmentDB({
      patientId,
      doctorId,
      date,
      time,
      reason
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked",
      data: appointment
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to create appointment"
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointmentsDB();

    return res.status(200).json({
      success: true,
      data: appointments
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch appointments"
    });
  }
};

const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await getAppointmentByIdDB(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error fetching appointment"
    });
  }
};

const updateAppointment= async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await updateAppointmentDB(id, req.body);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment updated",
      data: appointment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Update failed"
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await deleteAppointmentDB(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment deleted"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Delete failed"
    });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment
};