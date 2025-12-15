
// controllers/userController.js
import User from "../model/User.js"
import Car from '../model/Car.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get logged in user data
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all cars
export const getCar = async (req, res) => {
  try {
    const cars = await Car.find(); // fetch all cars
    res.status(200).json({ success: true, cars }); // ✅ FIXED: use res, return JSON
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
