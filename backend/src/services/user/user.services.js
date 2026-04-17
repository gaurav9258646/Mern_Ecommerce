const User = require("../../models/user");

const registerUserDB = async (data) => {
  return await User.create(data);
};

const findUserByEmailDB = async (email) => {
  return await User.findOne({ email });
};

const findUserByIdDB = async (id) => {
  return await User.findById(id);
};

const updateUserDB = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const deleteUserDB = async (id) => {
  return await User.findByIdAndDelete(id);
};
const getAllUsersDB = async () => {
  return await User.find();
};

module.exports = {
  registerUserDB,
  findUserByEmailDB,
  findUserByIdDB,
  updateUserDB,
  deleteUserDB,
  getAllUsersDB
};