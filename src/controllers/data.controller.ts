import { Request, Response, NextFunction } from 'express'
import { data } from '../models/data.model'
import cloudinary from '../config/cloudinary'

// add data
export const addData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, type } = req.body

    if (!req.file || !req.file.path) {
      res.status(400).json({ success: false, message: 'No file uploaded' })
      return
    }
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'data',
    })

    const newData = await data.create({
      image: result.secure_url,
      title,
      type,
    })

    res.status(201).json({ success: true, data: newData })
  } catch (error) {
    next(error)
  }
}

// get data using type on query
export const getData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type } = req.query
    const Data = await data.find({ type })
    res.status(200).json({ success: true, data: Data })
  } catch (error) {
    next(error)
  }
}

// delete data
export const deleteData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    await data.findByIdAndDelete(id)
    res
      .status(200)
      .json({ success: true, message: 'Data deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// edit a data
export const editData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const { title, type } = req.body

    if (!req.file || !req.file.path) {
      res.status(400).json({ success: false, message: 'No file uploaded' })
      return
    }
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'data',
    })

    const updatedData = await data.findByIdAndUpdate(
      id,
      { title, type, image: result.secure_url },
      { new: true }
    )
    res.status(200).json({ success: true, data: updatedData })
  } catch (error) {
    next(error)
  }
}
