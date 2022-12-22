import { model, Schema, Types } from 'mongoose'

const Profile = model(
  'profile',
  new Schema(
    {
      avatar: String,
      cover: String,
      email: String,
      username: String,
      fullName: String,
      address: String,
      birthDate: Date,
      bio: String,
      user: { type: Types.ObjectId, ref: 'user' },
    },
    { timestamps: true }
  ),
  'profiles'
)

export { Profile }
