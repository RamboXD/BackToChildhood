import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const register = async (req, res) => {
  try {
    const { task, login, password } = req.body;
    const newAdmin = new Admin({
      task,
      login,
      password,
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const admin = await Admin.findOne({ login });
    if (!admin) {
      return res.status(400).json({ message: "Ондай админ жокко брат" });
    }
    if (password != admin.password) {
      return res.status(400).json({ message: "Пароль қате бартишка" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    delete admin.password;
    res.status(200).json({ token, admin });
  } catch (err) { 
    res.status(500).json({ error: err.message });
  }
};
