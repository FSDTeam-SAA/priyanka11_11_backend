import { Request, Response } from 'express'
import { User } from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cloudinary from '../config/cloudinary'
import { authenticateJWT } from '../middlewares/authMiddleware'

// Registration
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) {
      res.status(400).json({ success: false, message: 'Email already in use' })
      return
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hash,
    })
   
    await user.save()
   
    res.status(201).json({
      success: true,
      message: 'Registered successfully',
    })
  } catch (e: any) {
    console.error('Registration error:', e)
    if (e.code === 11000) {
      if (e.keyPattern && e.keyPattern.phoneNumber) {
        res
          .status(400)
          .json({ success: false, message: 'Phone number already in use' })
        return
      }
      if (e.keyPattern && e.keyPattern.email) {
        res
          .status(400)
          .json({ success: false, message: 'Email already in use' })
        return
      }
      res.status(400).json({ success: false, message: 'Duplicate field value' })
      return
    }
    if (e.name === 'ValidationError') {
      res.status(400).json({ success: false, message: e.message })
      return
    }
    res.status(500).json({ success: false, message: 'Registration failed' })
  }
}

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid credentials' })
      return
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      res.status(400).json({ success: false, message: 'Invalid credentials' })
      return
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })
    // Exclude password from user data
    const { password: _pw, ...userData } = user.toObject()
    res.json({ success: true, token, user: userData })
  } catch (e) {
    res.status(500).json({ success: false, message: 'Login failed' })
  }
}


// Change Password
export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, oldPassword, newPassword } = req.body
    const user = await User.findById(userId)
    if (!user) {
      res.status(400).json({ success: false, message: 'User not found' })
      return
    }
    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) {
      res
        .status(400)
        .json({ success: false, message: 'Old password incorrect' })
      return
    }
    const hash = await bcrypt.hash(newPassword, 10)
    user.password = hash
    await user.save()
    res.json({ success: true, message: 'Password changed' })
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to change password' })
  }
}