const Admin = require("../../../models/admin");

// Create a new admin user
const createAdmin = async (req, res, next) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    next(error);
  }
};

// Get all admin users
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    next(error);
  }
};

// Get a single admin user by ID
const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

// Update an admin user by ID
const updateAdmin = async (req, res, next) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res
      .status(200)
      .json({ updateAdmin, token: generateToken(updatedAdmin._id) });
  } catch (error) {
    next(error);
  }
};

// Delete an admin user by ID
const deleteAdmin = async (req, res, next) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
