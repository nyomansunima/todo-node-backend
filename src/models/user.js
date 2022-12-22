import { model, Schema } from 'mongoose'

const User = model(
  'user',
  new Schema(
    {
      email: String,
      password: String,
      role: String,
    },
    { timestamps: true }
  ),
  'users'
)

export { User }
