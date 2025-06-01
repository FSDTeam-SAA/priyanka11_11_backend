import mongoose, { Schema, Document } from 'mongoose'

export interface IData extends Document {
  image: string
  title: string
  type: string
}

const dataSchema: Schema = new Schema(
  {
    image: { type: String,  },
    title: { type: String, },
    type: {
      type: String,
      enum: ['service', 'project', 'Client', "brandPartner"]
    },
  },
  { timestamps: true }
)

export const data = mongoose.model<IData>('data', dataSchema)
