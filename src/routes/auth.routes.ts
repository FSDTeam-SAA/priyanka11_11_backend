import { Router } from 'express'
import upload from '../config/multer'
import { authenticateJWT } from '../middlewares/authMiddleware'
import {
  register,
  login,
  changePassword,
  
} from '../controllers/auth.controller'

const router = Router()

router.post('/auth/register', register)
router.post('/auth/login', login)

router.post('/auth/change-password', changePassword)


export default router
