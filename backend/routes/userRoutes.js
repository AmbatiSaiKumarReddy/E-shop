import express from 'express'

const router = express.Router()
import User from '../models/userModel.js'
import {authUser, getUserProfile,registerUser} from '../controllers/userControllers.js'
import {protect} from '../middleware/authMiddleware.js'


router.post('/',registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile)

export default router