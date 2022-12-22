import { Router } from 'express'
import authController from './controllers/auth.js'

// create the router and
// assign with the controller
const router = Router()

// TODO:  Add all of the endpoints and assign with controller
router.post('/auth/email-password', authController.authEmail)

export default router
