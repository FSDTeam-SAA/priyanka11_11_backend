import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'No token provided' })
    return
  }
  const token = authHeader.split(' ')[1]
  let decoded: any
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' })
    return
  }
  User.findById(decoded.id)
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, message: 'User not found' })
        return
      }
      ;(req as any).user = user
      next()
    })
    .catch(() =>
      res.status(401).json({ success: false, message: 'Invalid token' })
    )
}

export const authorizeUserAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user
  if (!user) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    return
  }
  if (user.userType === 'admin') {
    res.status(403).json({ success: false, message: 'Forbidden: Not allowed' })
    next()
  }

  return
}

// only ceo can access
export const authorizeUserCeo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user
  if (!user) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    return
  }
  if (user.userType === 'ceo') {
    next()
    return
  }
  res.status(403).json({ success: false, message: 'Forbidden: Not allowed' })
  return
}

// only ceo can access
export const authorizeUserSales = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user
  if (!user) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    return
  }
  if (user.userType === 'sales') {
    res.status(403).json({ success: false, message: 'Forbidden: Not allowed' })

    next()
  }
  return
}
