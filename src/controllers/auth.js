import authService from '../services/auth.js'

class AuthController {
  async authEmail(req, res) {
    const { email, password } = req.body
    res.json(await authService.signEmailPass(email, password))
  }
}

const authController = new AuthController()
export default authController
