import { BadRequestError } from '@acruzjr/express-http-errors'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'
import jwt from 'jsonwebtoken'

class AuthService {
  async hashingPass(password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    return hashedPass
  }

  validatePass(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
  }

  async createToken(user) {
    const payload = { sub: user._id, email: user.email, role: user.role }
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    return token
  }

  async signEmailPass(email, password) {
    let user = await User.findOne({ email }).exec()
    if (!user) {
      const hashedPass = await this.hashingPass(password)
      user = await new User({
        email,
        password: hashedPass,
        role: 'user',
      }).save()

      await new Profile({ email, username: email.split('@')[0], user }).save()
    }

    if (!this.validatePass(password, user.password)) {
      throw new BadRequestError(
        'auth/incorect-password',
        'Opps, incorect password'
      )
    }

    const token = await this.createToken(user)

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    }
  }
}

const authService = new AuthService()
export default authService
