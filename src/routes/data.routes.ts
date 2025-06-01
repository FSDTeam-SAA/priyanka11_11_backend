import express from 'express'
import { addData, getData, deleteData, editData } from '../controllers/data.controller'
import upload from '../config/multer'
import {
  authenticateJWT,
  authorizeUserAdmin,
} from '../middlewares/authMiddleware'

const router = express.Router()

// add new data
router.post('/add/data', upload.single('image'), addData)

// get data by type
router.get('/data', getData)

// delete data
router.delete('/data/:id',  deleteData)

// update data 
router.put('/data/:id', upload.single('image'), editData)

export default router
